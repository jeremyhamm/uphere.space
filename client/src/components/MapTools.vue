<template>
  <div>
    <!-- Visible satellites content -->
    <b-modal
      id="visible-satellite-modal"
      title="Visible Satellites"
      :hide-footer="true"
      scrollable
      size="lg"
      title-class="h1"
      header-class="info-modal-header"
      body-class="info-modal-body"
      class="text-wrap"
    >
      <visible-satellites />
    </b-modal>
    <!-- Information content -->
    <b-modal
      id="info-modal"
      :title="selectedSatelliteDetails.name"
      :hide-footer="true"
      scrollable
      centered
      size="lg"
      title-class="h1"
      header-class="info-modal-header"
      body-class="info-modal-body"
      class="text-wrap"
    >
      <satellite-details />
    </b-modal>
    <!-- Tools -->
    <b-modal
      id="tools-modal"
      :hide-header="true"
      :ok-only="true"
      ok-title="Done"
      scrollable
      centered
      size="lg"
      body-class="tools-modal-body"
      footer-class="tools-modal-footer"
      class="text-wrap"
    >
      <options />
    </b-modal>
    <!-- Visible Alert -->
    <span
      v-if="showVisibilityAlert()"
      id="visible-alert"
      class="mr-5 text-uppercase"
    >
      Visible Overhead
    </span>
    <!-- Nearby Satellites -->
    <b-button
      v-if="userLocation"
      id="visible-satellites"
      class="mr-3 toggle-icon"
      @click="showVisibleSatellites()"
    >
      <span class="d-none d-md-inline mr-2">Visible Satellites</span>
      <font-awesome-icon class="toggle-icon" icon="satellite" size="lg" />
    </b-button>
    <!-- Info -->
    <b-button id="info-toggle" class="mr-3" v-b-modal.info-modal>
      <span class="d-none d-md-inline mr-2">Satellite Details</span>
      <font-awesome-icon class="toggle-icon" icon="info-circle" size="lg" />
    </b-button>
    <!-- Satellite tools -->
    <b-button id="satellite-tools" class="mr-3" v-b-modal.tools-modal>
      <span class="d-none d-md-inline mr-2">Settings</span>
      <font-awesome-icon class="toggle-icon" icon="sliders-h" size="lg" />
    </b-button>
  </div>
</template>

<script>
import ImageMixin from "@/mixins/image.mixin";
import VisibleSatellites from "./VisibleSatellites";
import Details from "./SatelliteDetails";
import Options from "./Options";
import dayjs from "dayjs";
export default {
  name: "Map-Tools",
  mixins: [ImageMixin],
  components: {
    "visible-satellites": VisibleSatellites,
    "satellite-details": Details,
    options: Options
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
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    },
    userLocation() {
      return this.$store.getters["user/getLocation"];
    }
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("MM/DD/YY");
    },
    showVisibleSatellites() {
      const params = this.userLocation
        ? {
            lng: this.userLocation.lon,
            lat: this.userLocation.lat
          }
        : null;
      this.$store.dispatch("user/getVisibleSatellites", params);
      this.$root.$emit("bv::show::modal", "visible-satellite-modal");
    },
    showVisibilityAlert() {
      if (
        this.selectedSatelliteLocation.visibility &&
        this.selectedSatelliteLocation.visibility.elevation > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss"></style>
