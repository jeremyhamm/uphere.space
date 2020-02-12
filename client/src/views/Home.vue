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
              height="50"
              width="50"
              alt="title"
            />
            <img
              :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo-lg.png`"
              class="d-none d-md-inline img-fluid"
              alt="uphere.space"
            />
            <h1 class="mt-3 mb-2 text-center">
              Real-time tracking and predictions for thousands of satellites.
            </h1>
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
    <b-row no-gutters v-if="satelliteList" class="justify-content-center mt-3">
      <b-col cols="12" md="10" xl="8"> </b-col>
    </b-row>
    <!-- Popular Satellites -->
    <b-row no-gutters class="justify-content-center mt-5">
      <b-col cols="12">
        <h4 class="text-center">
          Most popular satellites previous {{ this.timeRange }} day<span
            v-if="timeRange > 1"
            >s</span
          >
        </h4>
        <b-nav pills class="justify-content-center my-3 px-2">
          <b-nav-item
            href="javascript:void(0)"
            :active="timeRange === 1 ? true : false"
            router-tag="div"
            @click="setTimeRange(1)"
            class="mx-2"
            >24 hours</b-nav-item
          >
          <b-nav-item
            href="javascript:void(0)"
            :active="timeRange === 7 ? true : false"
            router-tag="div"
            @click="setTimeRange(7)"
            class="mx-2"
            >7 days</b-nav-item
          >
          <b-nav-item
            href="javascript:void(0)"
            :active="timeRange === 30 ? true : false"
            router-tag="div"
            @click="setTimeRange(30)"
            class="mx-2"
            >30 days</b-nav-item
          >
        </b-nav>
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
  </div>
</template>

<script>
import SatelliteCardDetails from "@/components/SatelliteCardDetails";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default {
  name: "home",
  components: {
    "satellite-card-details": SatelliteCardDetails
  },
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    const title = "Real-time satellite tracking and predictions";
    const description =
      "Real-time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    return {
      title: title,
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}`
        }
      ],
      meta: [
        {
          name: "description",
          content: description
        },
        {
          name: "keywords",
          content:
            "satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite,launch,real-time tracking,space"
        },
        {
          name: "subject",
          content: "Satellite Tracking"
        },
        {
          name: "url",
          content: `${process.env.VUE_APP_URL}`
        },
        // Open Graph
        {
          property: "og:site_name",
          content: "uphere.space"
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:url",
          content: `${process.env.VUE_APP_URL}`
        },
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:description",
          content: description
        },
        {
          property: "og:image",
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
          content: `Real-time tracking and predictions for thousands of satellites currently orbiting earth`
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
        {
          name: "twitter:creator",
          content: "@upheredotspace"
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
          itemprop: "image",
          content: `${
            process.env.VUE_APP_SPACES_URL
          }/images/satellites/ISS (ZARYA).png`
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
    },
    timeRange() {
      return this.$store.getters["satellite/getTopListTimeRange"];
    }
  },
  methods: {
    init() {
      this.$store.dispatch("satellite/fetchTopList", this.timeRange);
    },
    formatDate() {
      return dayjs()
        .utc()
        .format("MM/DD/YY");
    },
    setTimeRange(time) {
      this.$store.dispatch("satellite/fetchTopList", time);
    }
  }
};
</script>

<style lang="scss" scoped></style>
