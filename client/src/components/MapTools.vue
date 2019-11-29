<template>
  <div>
    <!-- Collapse content -->
    <b-collapse id="map-tools-collapse" class="mb-1">
      <b-row align-h="end" no-gutters>
        <b-col cols="12" md="6" lg="4" xl="3" class="pl-2 pl-md-0">
          <satellite-options />
        </b-col>
      </b-row>
    </b-collapse>
    <!-- Basemap Toggle -->
    <b-button id="basemap-toggle" class="mr-3" @click="toggleBasemap()">
      <font-awesome-icon class="toggle-icon" icon="layer-group" size="lg" />
    </b-button>
    <!-- Collapse button -->
    <b-button id="map-tools-toggle" v-b-toggle.map-tools-collapse>
      <font-awesome-icon class="toggle-icon" icon="sliders-h" size="lg" />
    </b-button>
  </div>
</template>

<script>
import SatelliteOptions from "./SatelliteOptions";
import MapService from "@/utils/map.service"
export default {
  name: "MapTools",
  components: {
    "satellite-options": SatelliteOptions
  },
  data() {
    return {
      config: process.env
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
    map() {
      return this.$store.getters["map/getMap"];
    }
  },
  methods: {
    toggleBasemap() {
      if (this.basemap === "default") {
        MapService.getBasemapUrl("night").addTo(this.map);
        this.basemap = "night";
      } else {
        MapService.getBasemapUrl("default").addTo(this.map);
        this.basemap = "default";
      }
    }
  }
};
</script>

<style lang="scss"></style>
