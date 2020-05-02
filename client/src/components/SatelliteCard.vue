<template>
  <div v-if="selectedSatelliteDetails && selectedSatelliteLocation">
    <b-card
      id="satellite-card"
      :img-src="
        satelliteImage(
          selectedSatelliteDetails.number,
          selectedSatelliteDetails.name
        )
      "
      :img-alt="`${selectedSatelliteDetails.name} image`"
      class="text-center"
      ref="card"
    >
      <!-- Close Icon -->
      <b-card-text class="exit-icon d-flex d-md-none" @click="closeCard()">
        <font-awesome-icon icon="times" size="lg" />
      </b-card-text>
      <!-- Title -->
      <b-card-text class="d-flex justify-content-center">
        <h4 class="text-center">{{ selectedSatelliteDetails.name }}</h4>
      </b-card-text>
      <!-- Satellite Details -->
      <b-list-group flush>
        <!-- Height -->
        <b-list-group-item>
          <small class="float-left text-uppercase">height</small>
          <span class="float-right">
            {{ formatMetricUnits(selectedSatelliteLocation.height) }}
            <small class="text-uppercase ml-1">
              <span v-if="units === 'metric'">km</span>
              <span v-else>mi</span>
            </small>
          </span>
        </b-list-group-item>
        <!-- Speed -->
        <b-list-group-item>
          <small class="float-left text-uppercase">speed</small>
          <span class="float-right">
            {{ formatMetricUnits(selectedSatelliteLocation.speed) }}
            <small class="text-uppercase ml-1">
              <span v-if="units === 'metric'">kph</span>
              <span v-else>mph</span>
            </small>
          </span>
        </b-list-group-item>
        <!-- Orbital Period -->
        <b-list-group-item>
          <small class="float-left text-uppercase">period</small>
          <span class="float-right">
            {{ formatFloat(selectedSatelliteDetails.orbital_period) }}
            <small class="text-uppercase ml-1">min</small>
          </span>
        </b-list-group-item>
        <!-- Azimuth -->
        <b-list-group-item v-if="selectedSatelliteLocation.visibility">
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
        </b-list-group-item>
        <!-- Elevation -->
        <b-list-group-item v-if="selectedSatelliteLocation.visibility">
          <small class="float-left text-uppercase">elevation</small>
          <span class="float-right">
            {{ formatFloat(selectedSatelliteLocation.visibility.elevation) }}
            &#176;
          </span>
        </b-list-group-item>
      </b-list-group>
      <!-- More Info -->
      <div
        v-if="selectedSatelliteDetails.links.length > 0"
        href="javascript:void(0)"
        class="more-info text-uppercase mt-2 mb-4"
        v-b-toggle.more-info
      >
        <small>More Info</small>
      </div>
      <b-collapse id="more-info">
        <b-list-group flush>
          <b-list-group-item
            v-for="links in selectedSatelliteDetails.links"
            :key="links.link_name"
            class="more-info d-flex justify-content-between align-items-center text-uppercase"
          >
            <b-link :href="links.link_url" target="_blank" class="w-100">
              <small class="float-left">
                {{ links.link_name }}
              </small>
              <font-awesome-icon
                class="float-right"
                icon="external-link-alt"
                size="sm"
              />
            </b-link>
          </b-list-group-item>
        </b-list-group>
      </b-collapse>
      <!-- Extras -->
      <satellite-card-extra
        v-if="satelliteExtraList.includes(selectedSatelliteDetails.name)"
        :satellites="satelliteExtraList"
      />
    </b-card>
  </div>
</template>

<script>
import ImageMixin from "@/mixins/image.mixin";
import UtilsMixin from "@/mixins/utils.mixin";
import SatelliteCardExtra from "@/components/SatelliteCardExtra";
export default {
  name: "Satellite-Card",
  mixins: [ImageMixin, UtilsMixin],
  components: {
    "satellite-card-extra": SatelliteCardExtra
  },
  data() {
    return {
      config: process.env,
      close: false,
      satelliteExtraList: [
        "SPACE STATION",
        "GOES 17",
        "GOES 16 [+]",
        "DRAGON CRS-19"
      ]
    };
  },
  mounted() {
    this.$refs.card.querySelector("img").onerror = this.showDefault;
  },
  computed: {
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    },
    units() {
      return this.$store.getters["user/getUnits"];
    }
  }
};
</script>

<style lang="scss"></style>
