<template>
  <div>
    <span
      v-b-tooltip.hover
      :title="category"
      v-for="category in categories"
      :key="category"
    >
      <font-awesome-icon
        class="px-1"
        :icon="selectCategories(category)"
        size="lg"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: "SatelliteCategories",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      config: process.env
    };
  },
  methods: {
    selectCategories(category) {
      switch (category) {
        case "AMATEUR RADIO":
        case "TSELINA":
        case "XM AND SIRIUS":
          return "broadcast-tower";
        case "BEIDOU NAVIGATION SYSTEM":
        case "GLOBAL POSITIONING SYSTEM (GPS) CONSTELLATION":
        case "GLOBAL POSITIONING SYSTEM (GPS) OPERATIONAL":
        case "GALILEO":
        case "GLONASS CONSTELLATION":
        case "GLONASS OPERATIONAL":
        case "IRNSS":
        case "NAVY NAVIGATION SATELLITE SYSTEM":
        case "PARUS":
        case "QZSS":
        case "RUSSIAN LEO NAVIGATION":
        case "TSIKADA":
        case "TSIKLON":
          return "location-arrow";
        case "BRIGHTEST":
          return "meteor";
        case "CELESTIS":
          return "skull";
        case "CUBESATS":
        case "FLOCK":
        case "LEMUR":
          return "cube";
        case "DISASTER MONITORING":
          return "house-damage";
        case "EARTH RESOURCES":
        case "GEODETIC":
        case "SPACE & EARTH SCIENCE":
          return "globe-americas";
        case "EDUCATION":
          return "book";
        case "ENGINEERING":
          return "cog";
        case "EXPERIMENTAL":
        case "WESTFORD NEEDLES":
          return "flask";
        case "GOES":
        case "YAOGAN":
          return "images";
        case "GEOSTATIONARY":
        case "SATELLITE-BASED AUGMENTATION SYSTEM":
          return "satellite";
        case "GLOBALSTAR":
        case "GONETS":
        case "GORIZONT":
        case "IRIDIUM":
        case "O3B NETWORKS":
        case "ORBCOMM":
          return "phone-square";
        case "ISS":
          return "rocket";
        case "INTELSAT":
        case "RADUGA":
          return "video";
        case "MILITARY":
        case "MOLNIYA":
        case "STRELA":
          return "fighter-jet";
        case "NOAA":
        case "WEATHER":
          return "cloud-showers-heavy";
        case "RADAR CALIBRATION":
        case "TRACKING AND DATA RELAY SATELLITE SYSTEM":
          return "satellite-dish";
        case "SEARCH & RESCUE":
          return "first-aid";
        case "STARLINK":
          return "star";
        case "TV":
          return "tv";
        default:
          return "question-circle";
      }
    }
  }
};
</script>

<style lang="scss"></style>
