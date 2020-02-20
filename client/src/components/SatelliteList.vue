<template>
  <div v-if="satelliteList">
    <!-- Content -->
    <div class="wrapper justify-content-center">
      <div
        v-for="satellite in satelliteList"
        :key="satellite.number"
        class="box mx-auto pt-3"
      >
        <satellite-card-details :satellite="satellite" />
      </div>
    </div>
  </div>
</template>

<script>
import SatelliteCardDetails from "@/components/SatelliteCardDetails";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  name: "Satellite-List",
  components: {
    "satellite-card-details": SatelliteCardDetails
  },
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    const title =
      "Satellite List | Real-time satellite tracking and predictions";
    const description =
      "List of satellites orbiting earth for tracking and predictions";
    const keywords =
      "real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
    return {
      title: title,
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/list`
        }
      ],
      meta: [
        {
          name: "description",
          content: description
        },
        {
          name: "keywords",
          content: keywords
        },
        // Open Graph
        {
          name: "og:type",
          content: "website"
        },
        {
          name: "og:url",
          content: `${process.env.VUE_APP_URL}/list`
        },
        {
          name: "og:title",
          content: title
        },
        {
          name: "og:description",
          content: description
        },
        {
          name: "og:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
        },
        // Twitter
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:site",
          content: "@upheredotspace"
        },
        {
          name: "twitter:title",
          content: title
        },
        {
          name: "twitter:description",
          content: description
        },
        {
          name: "twitter:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
        },
        {
          name: "twitter:image:alt",
          content: `ISS (ZARYA) in orbit`
        },
        // Google / Schema.org markup:
        {
          itemprop: "name",
          content: title
        },
        {
          itemprop: "description",
          content: description
        },
        {
          itemprop: "url",
          content: `${process.env.VUE_APP_URL}/list`
        },
        {
          itemprop: "image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
        },
        {
          itemprop: "keywords",
          content: keywords
        }
      ]
    };
  },
  computed: {
    satelliteList() {
      return this.$store.getters["satellite/getSatelliteList"];
    }
  },
  methods: {
    trackSatellite(satellite) {
      this.$router.push({ name: "Map", params: { satellite: satellite } });
    },
    formatLaunchDate(date) {
      return dayjs(date)
        .utc()
        .format("MM/DD/YY");
    }
  }
};
</script>

<style lang="scss"></style>
