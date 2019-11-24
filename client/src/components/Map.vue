<template>
  <div id="map" v-if="selectedSatelliteName">
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
import MapService from "@/utils/map.service";
import MapTools from "./MapTools";
import SatelliteMixin from "@/mixins/satellite.mixin";

export default {
  name: "SatelliteMap",
  mixins: [SatelliteMixin],
  components: {
    "map-tools": MapTools
  },
  metaInfo() {
    return {
      title: `${this.selectedSatelliteName}`,
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: 'canonical',
          href: `${process.env.VUE_APP_URL}/satellites/${this.selectedSatelliteName}`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            `Tracking and predictions for ${this.selectedSatelliteName} orbiting earth`
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: `${this.selectedSatelliteName}, satellite, orbit, tracking, map, mapping, nasa, iss, spacex, launch, goes`
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
          content: `${process.env.VUE_APP_URL}/satellites/${this.selectedSatelliteName}`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Realtime satellite tracking and predictions | ${this.selectedSatelliteName}`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Tracking and predictions for ${this.selectedSatelliteName} orbiting earth`
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: `${process.env.VUE_APP_SPACES_URL}/images/satellites/${this.selectedSatelliteName}.png`
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
          content: `Live satellite tracking and predictions for ${this.selectedSatelliteName}`
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: `Tracking and predictions for ${this.selectedSatelliteName} orbiting earth`
        },
        {
          vmid: "twitter:image",
          name: "twitter:image",
          content: `${process.env.VUE_APP_SPACES_URL}/images/satellites/${this.selectedSatelliteName}.png`
        },
        {
          vmid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `${this.selectedSatelliteName} in orbit`
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
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("satellite/satelliteDetails", this.selectedSatelliteName);
      this.$store
        .dispatch("satellite/satelliteLocation", this.selectedSatelliteName)
        .then(response => {
          const coords = this.selectedSatelliteLocation.geometry.coordinates;
          this.createMap(coords[0], coords[1]);
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
      const mapboxStreets = L.tileLayer(
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
      // Start realtime data
      this.runInterval();
    }
  }
};
</script>

<style lang="scss"></style>
