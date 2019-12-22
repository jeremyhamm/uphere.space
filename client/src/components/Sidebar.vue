<template>
  <satellite-card
    :satelliteName="selectedSatelliteNumber"
    v-if="selectedSatelliteDetails.name && selectedSatelliteLocation"
  />
</template>

<script>
import SatelliteCard from "@/components/SatelliteCard";
export default {
  name: "sidebar",
  components: {
    "satellite-card": SatelliteCard
  },
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    selectedSatelliteNumber() {
      return this.$store.getters["satellite/getSelectedSatelliteNumber"];
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    }
  }
};
</script>

<style lang="scss"></style>
