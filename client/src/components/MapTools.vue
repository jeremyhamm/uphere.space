<template>
  <div>
    <!-- Information content -->
    <b-modal
      id="info-collapse"
      :title="selectedSatelliteDetails.name"
      :hide-footer="true"
      scrollable
      centered
      size="lg"
      title-class="h1"
      header-class="info-collapse-header"
      body-class="info-collapse-body"
      class="text-wrap"
    >
      <b-row class="pb-4">
        <b-col cols="12" md="6">
          <b-list-group class="d-flex justify-content-between text-uppercase">
            <b-list-group-item class="d-flex justify-content-between"
              >NORAD ID:
              <span class="float-right">{{
                selectedSatelliteDetails.number
              }}</span></b-list-group-item
            >
            <b-list-group-item
              >International ID:
              <span class="float-right">{{
                selectedSatelliteDetails.intldes
              }}</span></b-list-group-item
            >
            <b-list-group-item
              >Country:
              <span class="float-right">{{
                selectedSatelliteDetails.country
              }}</span></b-list-group-item
            >
            <b-list-group-item
              >Launch Date:
              <span class="float-right">{{
                formatDate(selectedSatelliteDetails.launch_date)
              }}</span></b-list-group-item
            >
          </b-list-group>
        </b-col>
      </b-row>
      <p>{{ selectedSatelliteDetails.description }}</p>
    </b-modal>
    <!-- Satellite options -->
    <b-collapse id="satellite-options-collapse" class="mb-1">
      <b-row align-h="end" no-gutters>
        <b-col cols="12" md="6" lg="4" xl="3" class="pl-2 pl-md-0">
          <satellite-options />
        </b-col>
      </b-row>
    </b-collapse>
    <!-- User options -->
    <b-collapse id="user-options-collapse" class="mb-1">
      <b-row align-h="end" no-gutters>
        <b-col cols="12" md="6" lg="4" xl="3" class="pl-2 pl-md-0">
          <user-options />
        </b-col>
      </b-row>
    </b-collapse>
    <!-- Info -->
    <b-button id="info-toggle" class="mr-3" v-b-modal.info-collapse>
      <font-awesome-icon class="toggle-icon" icon="info-circle" size="lg" />
    </b-button>
    <!-- Basemap Toggle -->
    <b-button id="basemap-toggle" class="mr-3" @click="toggleBasemap()">
      <font-awesome-icon class="toggle-icon" icon="layer-group" size="lg" />
    </b-button>
    <!-- Satellite options -->
    <b-button
      id="satellite-options"
      class="mr-3"
      v-b-toggle.satellite-options-collapse
    >
      <font-awesome-icon class="toggle-icon" icon="sliders-h" size="lg" />
    </b-button>
    <!-- User options -->
    <b-button id="user-options" v-b-toggle.user-options-collapse>
      <font-awesome-icon class="toggle-icon" icon="user-cog" size="lg" />
    </b-button>
  </div>
</template>

<script>
import ImageMixin from "@/mixins/image.mixin";
import SatelliteOptions from "./SatelliteOptions";
import UserOptions from "./UserOptions";
import MapService from "@/services/map.service";
import dayjs from "dayjs";
export default {
  name: "Map-Tools",
  mixins: [ImageMixin],
  components: {
    "satellite-options": SatelliteOptions,
    "user-options": UserOptions
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
        this.map.removeLayer(MapService.getBasemapUrl("default"));
        MapService.getBasemapUrl("satellite").addTo(this.map);
        this.basemap = "satellite";
      } else if (this.basemap === "satellite") {
        this.map.removeLayer(MapService.getBasemapUrl("satellite"));
        MapService.getBasemapUrl("night").addTo(this.map);
        this.basemap = "night";
      } else if (this.basemap === "night") {
        this.map.removeLayer(MapService.getBasemapUrl("night"));
        MapService.getBasemapUrl("national_geographic").addTo(this.map);
        this.basemap = "national_geographic";
      } else {
        this.map.removeLayer(MapService.getBasemapUrl("national_geographic"));
        MapService.getBasemapUrl("default").addTo(this.map);
        this.basemap = "default";
      }
    },
    formatDate(date) {
      return dayjs(date).format("MM/DD/YY");
    }
  }
};
</script>

<style lang="scss"></style>
