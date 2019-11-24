<template>
  <div v-if="satelliteList">
    <!-- Content -->
    <div class="wrapper justify-content-center">
      <div
        v-for="satellite in satelliteList"
        :key="satellite.number"
        class="box mb-5 mx-auto pt-3"
      >
        <satellite-card-details :satellite="satellite" />
      </div>
    </div>
  </div>
</template>

<script>
import SatelliteCardDetails from "@/components/SatelliteCardDetails";
import SatelliteCategories from "@/components/SatelliteCategories";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  name: "SatelliteList",
  components: {
    "satellite-card-details": SatelliteCardDetails,
    "satellite-categories": SatelliteCategories
  },
  data() {
    return {
      config: process.env,
    };
  },
  metaInfo() {
    return {
      title: "Live satellite tracking and predictions",
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: 'canonical',
          href: `${process.env.VUE_APP_URL}/list`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "List of satellites orbiting earth for tracking and predictions"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "satellite,orbit,tracking,map,mapping,nasa,iss,list"
        },
        // Open Graph
        {
          vmid: "og:type",
          name: "og:type",
          content: "website"
        },
        {
          vmid: "og:url",
          name: "og:url",
          content: `${process.env.VUE_APP_URL}/list`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: "Satellite list"
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: "List of satellites orbiting earth for tracking and predictions"
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: `${process.env.VUE_APP_SPACES_URL}/images/satellites/ISS (ZARYA).png`
        },
        // Twitter
        { 
          vmid: "twitter:card",
          name: "twitter:card",
          content: "summary" 
        },
        {
          vmid: "twitter:site",
          name: "twitter:site",
          content: "@upheredotspace"
        },
        {
          vmid: "twitter:title",
          name: "twitter:title",
          content: "Satellite list"
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: "List of satellites orbiting earth for tracking and predictions"
        },
        {
          vmid: "twitter:image",
          name: "twitter:image",
          content: `${process.env.VUE_APP_SPACES_URL}/images/satellites/ISS (ZARYA).png`
        },
        {
          vmid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `ISS (ZARYA) in orbit`
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
    },
    satelliteImage(name) {
      if (name.includes("STARLINK")) {
        name = "STARLINK";
      }
      if (name.includes("GLOBALSTAR")) {
        name = "GLOBALSTAR";
      }
      if (name.includes("GONETS") || name.includes("STRELA")) {
        name = "GONETS";
      }
      if (name.includes("GORIZONT")) {
        name = "GORIZONT";
      }
      return `${this.config.VUE_APP_SPACES_URL}/images/satellites/${name}.png`;
    }
  }
};
</script>

<style lang="scss"></style>
