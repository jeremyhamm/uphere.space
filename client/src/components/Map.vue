<template>
  <div id="map" v-if="selectedSatelliteNumber">
    <map-tools
      id="map-tools"
      class="fixed-bottom text-right pr-2 pb-2 pb-md-0"
    />
    <b-alert
      v-if="selectedSatelliteLocation"
      :show="showVisibilityAlert()"
      class="visible-alert text-uppercase text-center"
      variant="primary"
      dismissible
    >
      Visible Overhead
    </b-alert>
  </div>
</template>

<script>
import L from "leaflet";
import MapService from "@/services/map.service";
import MapTools from "./MapTools";
import SatelliteMixin from "@/mixins/satellite.mixin";

export default {
  name: "SatelliteMap",
  mixins: [SatelliteMixin],
  components: {
    "map-tools": MapTools
  },
  metaInfo() {
    if (this.selectedSatelliteDetails === undefined) {
      return {
        title: "404",
        titleTemplate: "%s | uphere.space",
        meta: [
          {
            name: "prerender-status-code",
            content: 404
          }
        ]
      };
    } else {
      const satelliteName = this.selectedSatelliteDetails.name;
      const satelliteDetails = this.selectedSatelliteDetails;
      const title = `${satelliteName} | NORAD ID ${
        satelliteDetails.number
      } | Real-time satellite tracking and predictions`;
      const description = `Tracking and predictions for ${satelliteName}. Norad ID ${
        satelliteDetails.number
      }. International id ${satelliteDetails.intldes}. Launched by the ${
        satelliteDetails.country
      }. ${satelliteDetails.description}`;
      const keywords = `${satelliteName}, ${satelliteDetails.number}, ${
        satelliteDetails.intldes
      }, ${
        satelliteDetails.country
      }, real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere`;
      return {
        title: title,
        link: [
          {
            rel: "canonical",
            href: `${process.env.VUE_APP_URL}/satellites/${
              satelliteDetails.number
            }`
          }
        ],
        meta: [
          {
            name: "description",
            content: description
          },
          {
            name: "keywords",
            content: keywords
          },
          // Open Graph
          {
            name: "og:type",
            content: "website"
          },
          {
            name: "og:url",
            content: `${process.env.VUE_APP_URL}/satellites/${
              satelliteDetails.number
            }`
          },
          {
            name: "og:title",
            content: title
          },
          {
            name: "og:description",
            content: description
          },
          {
            name: "og:image",
            content: `${
              process.env.VUE_APP_SPACES_URL
            }/images/satellites/${satelliteName}.png`
          },
          {
            name: "og:email",
            content: `${process.env.VUE_APP_EMAIL}`
          },
          // Twitter
          {
            name: "twitter:card",
            content: "summary"
          },
          {
            name: "twitter:site",
            content: "@upheredotspace"
          },
          {
            name: "twitter:title",
            content: title
          },
          {
            name: "twitter:description",
            content: description
          },
          {
            name: "twitter:image",
            content: `${
              process.env.VUE_APP_SPACES_URL
            }/images/satellites/${satelliteName}.png`
          },
          {
            name: "twitter:image:alt",
            content: `${satelliteName} in orbit`
          },
          // Google / Schema.org markup:
          {
            itemprop: "name",
            content: title
          },
          {
            itemprop: "description",
            content: description
          },
          {
            itemprop: "url",
            content: `${process.env.VUE_APP_URL}/satellites/${
              satelliteDetails.number
            }`
          },
          {
            itemprop: "image",
            content: `${
              process.env.VUE_APP_SPACES_URL
            }/images/satellites/${satelliteName}.png`
          },
          {
            itemprop: "keywords",
            content: keywords
          }
        ]
      };
    }
  },
  computed: {
    userLocation() {
      return this.$store.getters["user/getLocation"];
    },
    cardVisibility() {
      return this.$store.getters["satellite/getCardVisibility"];
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("map/launchSites");
      this.$store
        .dispatch("satellite/satelliteDetails", this.selectedSatelliteNumber)
        .then(() => {
          this.$store.dispatch("satellite/satelliteOrbit", {
            number: this.selectedSatelliteNumber,
            period: this.selectedSatelliteDetails.orbital_period
          });
          this.$store
            .dispatch("satellite/satelliteLocation", {
              number: this.selectedSatelliteNumber,
              period: this.selectedSatelliteDetails.orbital_period
            })
            .then(() => {
              const coords = this.selectedSatelliteLocation.coordinates;
              this.createMap(coords[0], coords[1]);
            })
            .catch(() => {
              this.$router.push({ name: "FourZeroFour" });
            });
        })
        .catch(() => {
          this.$router.push({ name: "FourZeroFour" });
        });
    },
    createMap(lng, lat) {
      // Create Map
      this.map = L.map("map", {
        center: [lat, lng],
        zoom: 4,
        attributionControl: false,
        worldCopyJump: true
      });
      // Change the position of the Zoom Control to a newly created placeholder.
      this.map.zoomControl.setPosition("topright");
      // Controls
      MapService.setScaleControls("imperial").addTo(this.map);
      // Add default basemap
      L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          id: "mapbox.streets",
          accessToken: this.config.VUE_APP_MAPBOX_KEY
        }
      ).addTo(this.map);
      // Add data to map
      this.addSatelliteData();
      this.toggleOrbitalPath();
      this.addAllShadows();
      this.addLaunchSites();
      if (this.mapOptions["footprint"]) {
        this.toggleViewFootprint();
      }
      // Start real-time data
      this.runInterval();
    }
  }
};
</script>

<style lang="scss"></style>
