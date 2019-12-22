<template>
  <b-card
    class="text-center list-card"
    :img-src="satelliteImage(satellite.name)"
    :img-alt="`${satellite.name} image`"
    ref="card"
    @click="trackSatellite(satellite.number)"
  >
    <!-- Title -->
    <b-card-text class="d-flex justify-content-center">
      <h5 class="text-center">
        {{ satellite.name }}
      </h5>
    </b-card-text>
    <!-- Details -->
    <b-list-group flush>
      <!-- Norad ID -->
      <b-list-group-item class="d-flex justify-content-between">
        <small class="float-left text-uppercase">NORAD ID</small>
        <small class="float-right">{{ satellite.number }}</small>
      </b-list-group-item>
      <!-- Launch date -->
      <b-list-group-item class="d-flex justify-content-between">
        <small class="float-left text-uppercase">
          launched
        </small>
        <small class="float-right">
          {{ formatLaunchDate(satellite.launch_date) }}
        </small>
      </b-list-group-item>
      <!-- Orbital period -->
      <b-list-group-item class="d-flex justify-content-between">
        <small class="float-left text-uppercase">period</small>
        <small class="float-right" v-if="satellite.orbital_period">
          {{ satellite.orbital_period }} min
        </small>
        <small class="float-right" v-else>
          N/A
        </small>
      </b-list-group-item>
      <!-- Satellite type -->
      <b-list-group-item class="d-flex justify-content-between">
        <small class="float-left text-uppercase">type</small>
        <small class="float-right" v-if="satellite.type">
          {{ satellite.type }}
        </small>
        <small class="float-right" v-else>
          N/A
        </small>
      </b-list-group-item>
      <!-- Country -->
      <b-list-group-item class="d-flex justify-content-between">
        <small class="float-left text-uppercase">country</small>
        <small class="float-right" v-if="satellite.country">
          {{ satellite.country }}
        </small>
        <small class="float-right" v-else>
          N/A
        </small>
      </b-list-group-item>
    </b-list-group>
    <!-- Categories -->
    <p
      class="small d-flex justify-content-left mt-3"
      v-if="satellite.categories.length"
    >
      Categories
    </p>
    <p class="small d-flex justify-content-left mt-3" v-else>
      Not Categorized
    </p>
    <b-card-text
      class="d-flex justify-content-left"
      v-if="satellite.categories"
    >
      <satellite-categories :categories="satellite.categories" />
    </b-card-text>
  </b-card>
</template>

<script>
import ListMixin from "@/mixins/list.mixin";
import SatelliteCategories from "@/components/SatelliteCategories";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  name: "SatelliteList",
  mixins: [ListMixin],
  components: {
    "satellite-categories": SatelliteCategories
  },
  props: {
    satellite: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    satelliteList() {
      return this.$store.getters["satellite/getSatelliteList"];
    }
  },
  methods: {
    trackSatellite(satellite) {
      this.$router.push({ name: "Map", params: { satellite: satellite } });
    },
    formatLaunchDate(date) {
      return dayjs(date)
        .utc()
        .format("MM/DD/YY");
    },
    satelliteImage(name) {
      if (name.includes("STARLINK")) {
        name = "STARLINK";
      }
      if (name.includes("GLOBALSTAR")) {
        name = "GLOBALSTAR";
      }
      if (name.includes("GONETS") || name.includes("STRELA")) {
        name = "GONETS";
      }
      if (name.includes("GORIZONT")) {
        name = "GORIZONT";
      }
      return `${this.config.VUE_APP_SPACES_URL}/images/satellites/${name}.png`;
    }
  }
};
</script>

<style lang="scss"></style>
