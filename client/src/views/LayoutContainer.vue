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
        <satellite-card-mobile
          v-if="
            selectedSatelliteLocation &&
              selectedSatelliteDetails &&
              cardVisibility
          "
          class="satellite-card-mobile position-absolute d-md-none overflow-auto p-1"
        />
        <map-container />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import sidebar from "@/components/Sidebar";
import mapContainer from "@/components/Map";
import SatelliteCardMobile from "@/components/SatelliteCardMobile";
//import MapAdvertising from "@/components/MapAdvertising";
export default {
  name: "Layout-Container",
  components: {
    sidebar: sidebar,
    "map-container": mapContainer,
    "satellite-card-mobile": SatelliteCardMobile
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
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
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

<style lang="scss" scoped>
.satellite-card-mobile {
  top: 60px;
  z-index: 999;
  min-width: 50%;
  max-width: 50%;
}
</style>
