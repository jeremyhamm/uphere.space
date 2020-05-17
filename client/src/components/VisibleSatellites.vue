<template>
  <div>
    <b-list-group v-if="visibleSatellites.length">
      <b-list-group-item>
        <b-row class="pb-4">
          <b-col cols="4" class="text-uppercase font-weight-bold">Name</b-col>
          <b-col cols="4" class="text-uppercase font-weight-bold">Number</b-col>
        </b-row>
      </b-list-group-item>
      <b-list-group-item v-for="sat in visibleSatellites" :key="sat.number">
        <b-row>
          <b-col cols="4">
            {{ sat.name }}
          </b-col>
          <b-col cols="4">
            {{ sat.number }}
          </b-col>
          <b-col cols="4">
            <b-button variant="primary" @click="trackSatellite(sat.number)"
              >Track</b-button
            >
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <div v-else>No satellites visible in your area</div>
  </div>
</template>

<script>
export default {
  name: "Visible-Satellites",
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    userLocation() {
      return this.$store.getters["user/getLocation"];
    },
    visibleSatellites() {
      return this.$store.getters["user/getVisibleSatellites"];
    }
  },
  methods: {
    trackSatellite(number) {
      this.$router.push({
        name: "Map",
        params: { satellite: number },
        query: { location: true }
      });
      location.reload();
    }
  }
};
</script>

<style lang="scss"></style>
