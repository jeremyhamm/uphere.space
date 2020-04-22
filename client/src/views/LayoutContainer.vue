<template>
  <b-container fluid>
    <b-row class="max-height">
      <!-- Sidebar -->
      <b-col
        id="sidebar"
        cols="12"
        md="3"
        xl="2"
        class="max-height d-none d-md-inline-block px-0"
        :style="cardVisibility === true ? '' : ''"
      >
        <sidebar />
        <!-- <map-advertising /> -->
      </b-col>
      <!-- Map -->
      <b-col cols="12" md="9" xl="10" class="max-height px-0 flex-fill">
        <div
          id="satellite-card-sm-container"
          class="position-absolute d-flex d-md-none justify-content-center w-100 overflow-auto"
        >
          <satellite-card
            v-if="selectedSatelliteLocation && cardVisibility"
            class="satellite-card-sm"
          />
        </div>
        <map-container />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import sidebar from "@/components/Sidebar";
import mapContainer from "@/components/Map";
import SatelliteCard from "@/components/SatelliteCard";
//import MapAdvertising from "@/components/MapAdvertising";
export default {
  name: "Layout-Container",
  components: {
    sidebar: sidebar,
    "map-container": mapContainer,
    "satellite-card": SatelliteCard
    //"map-advertising": MapAdvertising
  },
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    userLocation() {
      return this.$store.getters["user/getLocation"];
    },
    cardVisibility() {
      return this.$store.getters["satellite/getCardVisibility"];
    },
    interval() {
      return this.$store.getters["satellite/getInterval"];
    },
    selectedSatelliteNumber() {
      return this.$store.getters["satellite/getSelectedSatelliteNumber"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
    next();
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit(
        "satellite/setSelectedSatelliteNumber",
        this.$route.params.satellite
      );
      this.$store.dispatch("user/userLocation");
    }
  }
};
</script>

<style lang="scss"></style>
