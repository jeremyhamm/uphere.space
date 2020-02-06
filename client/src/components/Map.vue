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
    const satelliteName = this.selectedSatelliteDetails.name
      ? this.selectedSatelliteDetails.name
      : "N/A";
    const satelliteDetails = this.selectedSatelliteDetails
      ? this.selectedSatelliteDetails
      : "N/A";
    return {
      title: `${satelliteName}`,
      titleTemplate: "%s | uphere.space",
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
          vmid: "description",
          name: "description",
          content: `Tracking and predictions for ${satelliteName}. Norad ID ${
            satelliteDetails.number
          }. International id ${satelliteDetails.intldes}. Launched by the ${
            satelliteDetails.country
          }.`
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: `${satelliteName}, ${satelliteDetails.number}, ${
            satelliteDetails.intldes
          }, ${
            satelliteDetails.country
          }, satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite`
        },
        // Open Graph
        {
          vmid: "og:type",
          name: "og:type",
          content: "website"
        },
        {
          vmid: "og:url",
          name: "og:url",
          content: `${process.env.VUE_APP_URL}/satellites/${
            satelliteDetails.number
          }`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Real-time satellite tracking and predictions | ${satelliteName}`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Tracking and predictions for ${satelliteName}. Norad ID ${
            satelliteDetails.number
          }. International id ${satelliteDetails.intldes}. Launched by the ${
            satelliteDetails.country
          }.`
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/${satelliteName}.png`
        },
        // Twitter
        {
          vmid: "twitter:card",
          name: "twitter:card",
          content: "summary"
        },
        {
          vmid: "twitter:site",
          name: "twitter:site",
          content: "@upheredotspace"
        },
        {
          vmid: "twitter:title",
          name: "twitter:title",
          content: `Real-time satellite tracking and predictions | ${satelliteName}`
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: `Tracking and predictions for ${satelliteName}. Norad ID ${
            satelliteDetails.number
          }. International id ${satelliteDetails.intldes}. Launched by the ${
            satelliteDetails.country
          }.`
        },
        {
          vmid: "twitter:image",
          name: "twitter:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/${satelliteName}.png`
        },
        {
          vmid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `${satelliteName} in orbit`
        }
      ]
    };
  },
  computed: {
    basemap: {
      get() {
        return this.$store.getters["map/getBasemap"];
      },
      set(val) {
        return this.$store.commit("map/setBasemap", val);
      }
    },
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
      this.$store
        .dispatch("satellite/satelliteDetails", this.selectedSatelliteNumber)
        .then(() => {
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
      this.basemap = "default";
      // Add data to map
      this.addSatelliteData();
      this.toggleOrbitalPath();
      this.addAllShadows();
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
