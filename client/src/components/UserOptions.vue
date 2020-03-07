<template>
  <b-list-group id="user-options">
    <!-- User location -->
    <b-list-group-item
      v-if="userLocation"
      class="d-flex justify-content-between align-items-center"
      @click="toggleLocation()"
    >
      Show my location
      <font-awesome-icon icon="toggle-on" size="2x" v-if="userMarker" />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
    <!-- Visible satellites -->
    <!-- <b-list-group-item
      v-if="userLocation"
      class="d-flex justify-content-between align-items-center"
      @click="toggleLocation()"
    >
      Show visible satellites
      <font-awesome-icon icon="toggle-on" size="2x" v-if="userMarker" />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item> -->
    <!-- Toggle units -->
    <b-list-group-item class="text-left">
      <b-form-group label="Toggle Units">
        <b-form-radio-group
          id="units-toggle"
          v-model="units"
          name="units-toggle"
        >
          <b-form-radio name="toggle-units" value="imperial"
            >Imperial</b-form-radio
          >
          <b-form-radio name="toggle-units" value="metric">Metric</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import SatelliteMixin from "@/mixins/satellite.mixin";
export default {
  name: "UserOptions",
  mixins: [SatelliteMixin],
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    units: {
      get() {
        return this.$store.getters["user/getUnits"];
      },
      set(val) {
        this.$store.commit("user/setUnits", val);
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss"></style>
