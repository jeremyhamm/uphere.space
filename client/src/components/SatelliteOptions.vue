<template>
  <b-list-group id="map-tools-content">
    <!-- Tracking -->
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      @click="toggleOptions('tracking')"
    >
      Enable tracking
      <font-awesome-icon
        icon="toggle-on"
        size="2x"
        v-if="mapOptions.tracking"
      />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
    <!-- Footprint -->
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      @click="toggleOptions('footprint')"
    >
      Show Visible Footprint
      <font-awesome-icon
        icon="toggle-on"
        size="2x"
        v-if="mapOptions.footprint"
      />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
    <!-- Path -->
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      @click="toggleOptions('path')"
    >
      Show Orbital Path
      <font-awesome-icon icon="toggle-on" size="2x" v-if="mapOptions.path" />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
    <!-- Night shadow -->
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      @click="toggleOptions('shadow')"
    >
      Show Night Shadow
      <font-awesome-icon icon="toggle-on" size="2x" v-if="mapOptions.shadow" />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
    <!-- User location -->
    <b-list-group-item
      v-if="userLocation"
      class="d-flex justify-content-between align-items-center"
      @click="toggleOptions('location')"
    >
      Show my location
      <font-awesome-icon icon="toggle-on" size="2x" v-if="userMarker" />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
    <!-- Toggle units -->
    <b-list-group-item class="text-left" v-if="units">
      <b-form-group label="Toggle Units">
        <b-form-radio-group
          id="units-toggle"
          v-model="units"
          name="units-toggle"
          @change="toggleUnits()"
        >
          <b-form-radio name="toggle-units" value="metric"
            >Imperial</b-form-radio
          >
          <b-form-radio name="toggle-units" value="imperial"
            >Metric</b-form-radio
          >
        </b-form-radio-group>
      </b-form-group>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import SatelliteMixin from "@/mixins/satellite.mixin";
export default {
  name: "SatelliteOptions",
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
  methods: {
    toggleOptions(name) {
      this.mapOptions[name] = !this.mapOptions[name];
      switch (name) {
        case "footprint":
          this.toggleViewFootprint();
          break;
        case "path":
          this.toggleOrbitalPath();
          break;
        case "shadow":
          this.toggleShadows();
          break;
        case "location":
          this.toggleLocation();
          break;
        default:
          break;
      }
    },
    toggleUnits() {
      const settings = {
        units: this.units
      };
      this.$store.dispatch("user/toggleSettings", settings);
    }
  }
};
</script>

<style lang="scss"></style>
