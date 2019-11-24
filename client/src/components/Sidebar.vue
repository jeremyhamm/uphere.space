<template>
  <satellite-card
    :satelliteName="selectedSatelliteName"
    v-if="selectedSatelliteLocation"
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
    selectedSatelliteName() {
      return this.$store.getters["satellite/getSelectedSatelliteName"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    }
  },
  methods: {}
};
</script>

<style lang="scss"></style>
