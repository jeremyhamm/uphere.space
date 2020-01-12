<template>
  <div v-if="selectedSatelliteDetails.name && selectedSatelliteLocation">
    <b-card
      id="satellite-card"
      :img-src="satelliteImage()"
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
            {{ formatFloat(selectedSatelliteLocation.properties.height) }}
            <small class="text-uppercase ml-1">mi</small>
          </span>
        </b-list-group-item>
        <!-- Speed -->
        <b-list-group-item>
          <small class="float-left text-uppercase">speed</small>
          <span class="float-right">
            {{ formatFloat(selectedSatelliteLocation.properties.speed) }}
            <small class="text-uppercase ml-1">mph</small>
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
        <b-list-group-item
          v-if="selectedSatelliteLocation.properties.visibility.azimuth"
        >
          <small class="float-left text-uppercase">azimuth</small>
          <span class="float-right">
            {{
              formatFloat(
                selectedSatelliteLocation.properties.visibility.azimuth
              )
            }}
            <small class="text-uppercase ml-1">
              {{
                getCompassDirection(
                  selectedSatelliteLocation.properties.visibility.azimuth
                )
              }}
            </small>
          </span>
        </b-list-group-item>
        <!-- Elevation -->
        <b-list-group-item
          v-if="selectedSatelliteLocation.properties.visibility.elevation"
        >
          <small class="float-left text-uppercase">elevation</small>
          <span class="float-right">
            {{
              formatFloat(
                selectedSatelliteLocation.properties.visibility.elevation
              )
            }}
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
            <b-link :href="links.link_url" target="_blank">
              <small>
                {{ links.link_name }}
              </small>
            </b-link>
            <font-awesome-icon icon="external-link-alt" size="sm" />
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
import SatelliteCardExtra from "@/components/SatelliteCardExtra";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  name: "Satellite-Card",
  components: {
    "satellite-card-extra": SatelliteCardExtra
  },
  data() {
    return {
      config: process.env,
      close: false,
      satelliteExtraList: [
        "ISS (ZARYA)",
        "GOES 17",
        "GOES 16 [+]",
        "DRAGON CRS-19"
      ]
    };
  },
  computed: {
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    }
  },
  mounted() {
    this.$refs.card.querySelector("img").onerror = this.showDefault;
  },
  methods: {
    formatFloat(height) {
      return parseFloat(height).toFixed(2);
    },
    formatDate(date) {
      return dayjs
        .unix(date)
        .utc()
        .format("MM/DD/YY");
    },
    formatTime(time) {
      return dayjs
        .unix(time)
        .utc()
        .format("H:mm:ss");
    },
    closeCard() {
      this.$store.commit("satellite/setCardVisibility", false);
    },
    satelliteImage() {
      let satelliteName = this.selectedSatelliteDetails.name;
      if (satelliteName.includes("STARLINK")) {
        satelliteName = "STARLINK";
      }
      return `${
        this.config.VUE_APP_SPACES_URL
      }/images/satellites/${satelliteName}.png`;
    },
    showDefault(evt) {
      evt.target.src =
        this.config.VUE_APP_SPACES_URL + "/images/satellites/default.png";
    },
    getCompassDirection(deg) {
      switch (true) {
        case deg >= 348.76 && deg <= 11.25:
          return "N";
        case deg >= 11.26 && deg <= 33.75:
          return "NNE";
        case deg >= 33.76 && deg <= 56.25:
          return "NE";
        case deg >= 56.26 && deg <= 78.75:
          return "ENE";
        case deg >= 78.76 && deg <= 101.25:
          return "E";
        case deg >= 101.26 && deg <= 123.75:
          return "ESE";
        case deg >= 123.76 && deg <= 146.25:
          return "SE";
        case deg >= 146.26 && deg <= 168.75:
          return "SSE";
        case deg >= 168.76 && deg <= 191.25:
          return "S";
        case deg >= 191.26 && deg <= 213.75:
          return "SSW";
        case deg >= 213.76 && deg <= 236.25:
          return "SW";
        case deg >= 236.26 && deg <= 258.75:
          return "WSW";
        case deg >= 258.76 && deg <= 281.25:
          return "W";
        case deg >= 281.26 && deg <= 303.75:
          return "WNW";
        case deg >= 303.76 && deg <= 326.25:
          return "NW";
        case deg >= 326.26 && deg <= 348.75:
          return "NNW";
        default:
          return "N/A";
      }
    }
  }
};
</script>

<style lang="scss"></style>
