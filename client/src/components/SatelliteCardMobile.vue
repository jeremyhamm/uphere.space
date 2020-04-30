<template>
  <div class="details-container py-2">
    <div class="details-close" @click="closeDetails()">
      <font-awesome-icon icon="times" />
    </div>
    <h4 class="pl-2 text-center text-truncate">
      {{ selectedSatelliteDetails.name }}
    </h4>
    <b-list-group flush>
      <!-- Height -->
      <b-list-group-item>
        <small class="float-left text-uppercase">height</small>
        <small class="float-right">
          {{ formatMetricUnits(selectedSatelliteLocation.height) }}
          <small class="text-uppercase ml-1">
            <span v-if="units === 'metric'">km</span>
            <span v-else>mi</span>
          </small>
        </small>
      </b-list-group-item>
      <!-- Speed -->
      <b-list-group-item>
        <small class="float-left text-uppercase">speed</small>
        <small class="float-right">
          {{ formatMetricUnits(selectedSatelliteLocation.speed) }}
          <small class="text-uppercase ml-1">
            <span v-if="units === 'metric'">kph</span>
            <span v-else>mph</span>
          </small>
        </small>
      </b-list-group-item>
      <!-- Orbital Period -->
      <b-list-group-item>
        <small class="float-left text-uppercase">period</small>
        <small class="float-right">
          {{ formatFloat(selectedSatelliteDetails.orbital_period) }}
          <small class="text-uppercase ml-1">min</small>
        </small>
      </b-list-group-item>
    </b-list-group>
    <!-- Azimuth & Elevation -->
    <!-- <div>
      <small class="float-left text-uppercase">azimuth</small>
      <span class="float-right">
        {{ formatFloat(selectedSatelliteLocation.visibility.azimuth) }}
        <small class="text-uppercase ml-1">
          {{
            getCompassDirection(
              selectedSatelliteLocation.visibility.azimuth
            )
          }}
        </small>
      </span>
    </div>
    <div>
      <small class="float-left text-uppercase">elevation</small>
      <span class="float-right">
        {{ formatFloat(selectedSatelliteLocation.visibility.elevation) }}
        &#176;
      </span>
    </div> -->
  </div>
</template>

<script>
import UtilsMixin from "@/mixins/utils.mixin";
export default {
  name: "Satellite-Card-Mobile",
  mixins: [UtilsMixin],
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    cardVisibility: {
      get() {
        return this.$store.getters["satellite/getCardVisibility"];
      },
      set(val) {
        return this.$store.commit("satellite/setCardVisibility", val);
      }
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    },
    units() {
      return this.$store.getters["user/getUnits"];
    }
  },
  methods: {
    closeDetails() {
      this.cardVisibility = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.details-container {
  .details-close {
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
      cursor: pointer;
    }
  }
  background-color: $overlay-dark;
  color: $white;
  .list-group {
    .list-group-item {
      background-color: transparent;
    }
  }
}
</style>
