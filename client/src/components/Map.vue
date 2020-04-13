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
import "@/utils/Leaflet.greatCircle";
import "@/utils/Leaflet.Geodesic";
import SatelliteMixin from "@/mixins/satellite.mixin";
import MapService from "@/services/map.service";
import MapTools from "./MapTools";

export default {
  name: "Satellite-Map",
  mixins: [SatelliteMixin],
  components: {
    "map-tools": MapTools
  },
  data() {
    return {
      config: process.env,
      realTimeData: null
    };
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
    map: {
      get() {
        return this.$store.getters["map/getMap"];
      },
      set(val) {
        this.$store.commit("map/setMap", val);
      }
    },
    mapOptions: {
      get() {
        return this.$store.getters["map/getAllOptions"];
      },
      set({ name, value }) {
        this.options[name] = value;
      }
    },
    footprint: {
      get() {
        return this.$store.getters["map/getFootprint"];
      },
      set(val) {
        this.$store.commit("map/setFootprint", val);
      }
    },
    path: {
      get() {
        return this.$store.getters["map/getPath"];
      },
      set(val) {
        this.$store.commit("map/setPath", val);
      }
    },
    shadows: {
      get() {
        return this.$store.getters["map/getShadows"];
      },
      set({ name, value }) {
        this.shadows[name] = value;
      }
    },
    launchSites() {
      return this.$store.getters["map/getLaunchSites"];
    },
    userMarker: {
      get() {
        return this.$store.getters["user/getMarker"];
      },
      set(val) {
        return this.$store.commit("user/setMarker", val);
      }
    },
    userIcon() {
      return this.$store.getters["user/getIcon"];
    },
    userLocation() {
      return this.$store.getters["user/getLocation"];
    },
    interval: {
      get() {
        return this.$store.getters["satellite/getInterval"];
      },
      set(val) {
        this.$store.commit("satellite/setInterval", val);
      }
    },
    selectedSatelliteNumber() {
      return this.$store.getters["satellite/getSelectedSatelliteNumber"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    },
    selectedSatelliteOrbit() {
      return this.$store.getters["satellite/getSelectedSatelliteOrbit"];
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    },
    cardVisibility() {
      return this.$store.getters["satellite/getCardVisibility"];
    }
  },
  created() {
    this.init();
  },
  onIdle() {
    this.$router.push({ name: "Timeout" });
  },
  methods: {
    /**
     * Get required data on create
     */
    init() {
      this.$store.dispatch("map/launchSites");
      this.$store
        .dispatch("satellite/satelliteDetails", this.selectedSatelliteNumber)
        .then(() => {
          this.$store
            .dispatch("satellite/satelliteLocation", {
              number: this.selectedSatelliteNumber,
              period: this.selectedSatelliteDetails.orbital_period
            })
            .then(() => {
              this.$store
                .dispatch("satellite/satelliteOrbit", {
                  number: this.selectedSatelliteNumber,
                  period: this.selectedSatelliteDetails.orbital_period
                })
                .then(() => {
                  const coords = this.selectedSatelliteLocation.coordinates;
                  this.createMap(coords[0], coords[1]);
                });
            })
            .catch(() => {
              this.$router.push({ name: "FourZeroFour" });
            });
        })
        .catch(() => {
          this.$router.push({ name: "FourZeroFour" });
        });
    },
    /**
     * Create map
     */
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
    },
    /**
     * Get current satellite location
     */
    loadLocationData() {
      this.$store
        .dispatch("satellite/satelliteLocation", {
          number: this.selectedSatelliteNumber,
          period: this.selectedSatelliteDetails.orbital_period
        })
        .then(() => {
          this.setSatelliteSource();
          if (this.mapOptions.tracking) {
            this.setMapTracking();
          }
          if (this.mapOptions.footprint) {
            this.footprint.remove();
            this.toggleViewFootprint();
          }
        });
    },
    /**
     * Follow satellite toggle
     */
    setMapTracking() {
      const coords = this.selectedSatelliteLocation.coordinates;
      this.map.setView([coords[1], coords[0]]);
    },
    /**
     * Add satellite layer to map
     */
    setSatelliteSource() {
      this.realTimeData.remove();
      this.addSatelliteData();
    },
    determineIconSize(icon) {
      switch (icon) {
        case "AQUA":
          return [60, 30];
        case "DRAGON CRS-19":
          return [50, 40];
        case "GOES 17":
          return [60, 40];
        case "HST":
        case "SPACE STATION":
        case "SWIFT":
          return [60, 60];
        case "TERRA":
          return [40, 60];
        default:
          return [40, 40];
      }
    },
    determineIconImage(icon) {
      switch (icon) {
        case "AQUA":
          return "aqua.svg";
        case "DRAGON CRS-20":
          return "spacex_dragon.svg";
        case "GOES 17":
          return "goes.svg";
        case "HST":
          return "hubble.svg";
        case "SPACE STATION":
          return "iss.svg";
        case "SWIFT":
          return "swift.svg";
        case "TERRA":
          return "terra.svg";
        default:
          return this.selectSatelliteIcon(this.selectedSatelliteDetails.type);
      }
    },
    /**
     * Add satellite icon to map
     */
    addSatelliteData() {
      const iconSize = this.determineIconSize(
        this.selectedSatelliteDetails.name
      );
      const iconName = this.determineIconImage(
        this.selectedSatelliteDetails.name
      );
      const smallIcon = new L.Icon({
        iconSize: iconSize,
        iconUrl: `${this.config.VUE_APP_SPACES_URL}/images/icons/${iconName}`
      });
      const coords = this.selectedSatelliteLocation.coordinates;
      this.realTimeData = L.marker([coords[1], coords[0]], {
        icon: smallIcon
      }).addTo(this.map);
      this.realTimeData.on("click", () => {
        this.satelliteClickHandler();
      });
    },
    /**
     * Select icon by satellite type
     *
     * @param {String} satellite type
     */
    selectSatelliteIcon(type) {
      switch (type) {
        case "ROCKET BODY":
        case "DEBRIS":
          return "rocket.svg";
        default:
          return "default.svg";
      }
    },
    /**
     * Toggle satellite visibility alert
     */
    showVisibilityAlert() {
      if (
        this.selectedSatelliteLocation.visibility &&
        this.selectedSatelliteLocation.visibility.elevation > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Show satellite card on xs
     */
    satelliteClickHandler() {
      this.$store.commit("satellite/setCardVisibility", true);
    },
    /**
     * Update location every 1 seconds
     */
    runInterval() {
      this.interval = setInterval(() => {
        this.loadLocationData();
      }, this.config.VUE_APP_REFRESH);
    }
  }
};
</script>

<style lang="scss"></style>
