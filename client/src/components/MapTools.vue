<template>
  <div>
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
      ok-title="done"
      scrollable
      centered
      size="lg"
      body-class="tools-modal-body"
      footer-class="tools-modal-footer"
      class="text-wrap"
    >
      <options />
    </b-modal>
    <!-- Nearby Satellites -->
    <!-- <b-button
      id="visible-satellites"
      class="mr-3 toggle-icon"
      @click="showVisibleSatellites()"
    >
      Visible Satellites
    </b-button> -->
    <!-- Info -->
    <b-button id="info-toggle" class="mr-3" v-b-modal.info-modal>
      <font-awesome-icon class="toggle-icon" icon="info-circle" size="lg" />
    </b-button>
    <!-- Satellite tools -->
    <b-button id="satellite-tools" class="mr-3" v-b-modal.tools-modal>
      <font-awesome-icon class="toggle-icon" icon="sliders-h" size="lg" />
    </b-button>
  </div>
</template>

<script>
import ImageMixin from "@/mixins/image.mixin";
import Details from "./SatelliteDetails";
import Options from "./Options";
import dayjs from "dayjs";
export default {
  name: "Map-Tools",
  mixins: [ImageMixin],
  components: {
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
    }
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("MM/DD/YY");
    },
    showVisibleSatellites() {
      this.$store.dispatch("user/getVisibleSatellites");
    }
  }
};
</script>

<style lang="scss"></style>
