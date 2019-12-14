<template>
  <div>
    <!-- Welcome -->
    <div class="home">
      <div class="overlay">
        <b-row no-gutters class="title justify-content-center">
          <b-col cols="12" md="10" xl="8" class="text-center">
            <img
              :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo.svg`"
              class="img-fluid logo-filter mr-2"
              height="35"
              width="35"
              alt="title"
            />
            <img
              :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo-lg.png`"
              class="d-none d-md-inline img-fluid"
              alt="uphere.space"
            />
            <h3 class="mt-3 mb-5 text-center">
              Realtime tracking and predictions for thousands of satellites.
              Find the International Space Station, the Hubble Space telescope
              and many more!
            </h3>
          </b-col>
        </b-row>
        <!-- Satellite List -->
        <b-row
          no-gutters
          class="justify-content-center my-5"
          style="margin-top: 100%;"
        >
          <b-col cols="12" class="text-center">
            <b-button
              href="javascript:void(0)"
              variant="danger"
              size="lg"
              to="/list"
            >
              Satellite Tracking List
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- Popular Satellites -->
    <b-row no-gutters class="justify-content-center mt-5">
      <b-col cols="12">
        <h4 class="text-center">
          Most popular satellites today {{ formatDate() }}
        </h4>
      </b-col>
    </b-row>
    <b-row no-gutters v-if="satelliteList" class="justify-content-center mt-3">
      <b-col cols="12" md="10" xl="8">
        <div class="wrapper justify-content-center">
          <div
            v-for="satellite in satelliteList"
            :key="satellite.number"
            class="box mb-5 mx-auto pt-3"
          >
            <satellite-card-details :satellite="satellite" />
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- Advertising -->
    <advertising class="my-5" />
  </div>
</template>

<script>
import SatelliteCardDetails from "@/components/SatelliteCardDetails";
import LandingPageAdvertising from "@/components/LandingPageAdvertising";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  name: "home",
  components: {
    "satellite-card-details": SatelliteCardDetails,
    advertising: LandingPageAdvertising
  },
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    return {
      title: "Realtime satellite tracking and predictions",
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Realtime tracking and predictions for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite, "
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
          content: `${process.env.VUE_APP_URL}`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Realtime tracking and predictions for thousands of satellites currently orbiting earth`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Realtime tracking and predictions for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
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
          content: `Realtime tracking and predictions for thousands of satellites currently orbiting earth`
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: `Realtime tracking and predictions for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
        },
        {
          vmid: "twitter:image",
          name: "twitter:image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
        },
        {
          vmid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `ISS (ZARYA) in orbit`
        },
        {
          vmid: "twitter:creator",
          name: "twitter:creator",
          content: "@upheredotspace"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  computed: {
    satelliteList() {
      return this.$store.getters["satellite/getTopList"];
    }
  },
  methods: {
    init() {
      this.$store.dispatch("satellite/fetchTopList");
    },
    formatDate() {
      return dayjs()
        .utc()
        .format("MM/DD/YY");
    }
  }
};
</script>

<style lang="scss" scoped></style>
