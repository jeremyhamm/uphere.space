<template>
  <div>
    <!-- Information content -->
    <b-modal
      id="info-collapse"
      :hide-header="true"
      :hide-footer="true"
      size="md"
      body-class="info-collapse-body"
      :centered="true"
      class="text-wrap"
    >
      <h1>{{ selectedSatelliteDetails.name }}</h1>
      <p>{{ selectedSatelliteDetails.description }}</p>
    </b-modal>
    <!-- Map Tools content -->
    <b-collapse id="map-tools-collapse" class="mb-1">
      <b-row align-h="end" no-gutters>
        <b-col cols="12" md="6" lg="4" xl="3" class="pl-2 pl-md-0">
          <satellite-options />
        </b-col>
      </b-row>
    </b-collapse>
    <!-- Info -->
    <b-button
      id="info-toggle"
      class="mr-3"
      v-b-modal.info-collapse
      v-if="selectedSatelliteDetails.description"
    >
      <font-awesome-icon class="toggle-icon" icon="info-circle" size="lg" />
    </b-button>
    <!-- Basemap Toggle -->
    <b-button id="basemap-toggle" class="mr-3" @click="toggleBasemap()">
      <font-awesome-icon class="toggle-icon" icon="layer-group" size="lg" />
    </b-button>
    <!-- Map tools button -->
    <b-button id="map-tools-toggle" v-b-toggle.map-tools-collapse>
      <font-awesome-icon class="toggle-icon" icon="sliders-h" size="lg" />
    </b-button>
  </div>
</template>

<script>
import ImageMixin from "@/mixins/image.mixin";
import SatelliteOptions from "./SatelliteOptions";
import MapService from "@/services/map.service";
export default {
  name: "Map-Tools",
  mixins: [ImageMixin],
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
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    }
  },
  methods: {
    toggleBasemap() {
      if (this.basemap === "default") {
        MapService.getBasemapUrl("satellite").addTo(this.map);
        this.basemap = "satellite";
      } else if(this.basemap === "satellite"){
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
