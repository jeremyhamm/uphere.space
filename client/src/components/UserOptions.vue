<template>
  <b-list-group v-if="userLocation">
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
    >
      <span>Location</span>
      {{ userLocation.city }}, {{ userLocation.region_code }},
      {{ userLocation.country_name }}
    </b-list-group-item>
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      @click="showUserLocation()"
    >
      Show my location
      <font-awesome-icon icon="toggle-on" size="2x" v-if="showLocation" />
      <font-awesome-icon icon="toggle-off" size="2x" v-else />
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import L from "leaflet";
import SatelliteMixin from "@/mixins/satellite.mixin";
export default {
  name: "UserOptions",
  mixins: [SatelliteMixin],
  data() {
    return {
      config: process.env,
      showLocation: false
    };
  },
  computed: {
    userLocation() {
      return this.$store.getters["user/getLocation"];
    },
    userIcon() {
      return this.$store.getters["user/getIcon"];
    },
    userMarker: {
      get: function() {
        return this.$store.getters["user/getMarker"];
      },
      set: function(val) {
        this.$store.commit("user/setMarker", val);
      }
    },
    map() {
      return this.$store.getters["map/getMap"];
    },
    mapOptions: {
      get: function() {
        return this.$store.getters["map/getAllOptions"];
      },
      set: function({ name, value }) {
        this.options[name] = value;
      }
    }
  },
  methods: {
    showUserLocation() {
      this.showLocation = !this.showLocation;
      this.mapOptions["tracking"] = false;
      if (this.showLocation) {
        this.addUserLocationMarker();
        this.map.setView(
          [this.userLocation.latitude, this.userLocation.longitude],
          10
        );
      } else {
        this.userMarker.remove();
      }
    },
    addUserLocationMarker() {
      let icon = L.icon(this.userIcon);
      this.userMarker = L.marker(
        [this.userLocation.latitude, this.userLocation.longitude],
        {
          icon: icon
        }
      ).addTo(this.map);
    }
  }
};
</script>

<style lang="scss"></style>
