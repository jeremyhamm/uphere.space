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
import Options from "./Options";
import dayjs from "dayjs";
export default {
  name: "Map-Tools",
  mixins: [ImageMixin],
  components: {
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
    }
  }
};
</script>

<style lang="scss"></style>
