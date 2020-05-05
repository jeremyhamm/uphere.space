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
            <h1 class="mt-3 mb-2 text-center text-color-light">
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
              variant="primary"
              size="lg"
              to="/list"
            >
              Satellite Tracking List
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- Satellite Count -->
    <b-row no-gutters class="title count justify-content-center text-center">
      <b-col cols="12" md="4" xl="3" class="my-3 my-md-0">
        <div class="pb-2">
          <font-awesome-icon icon="satellite" size="2x" />
        </div>
        <h4 class="text-uppercase">
          Real time Tracking
        </h4>
        <p>
          Real time orbital tracking and prediction for over 3,200 satellites
        </p>
      </b-col>
      <b-col cols="12" md="4" xl="3" class="my-3 my-md-0">
        <div class="pb-2">
          <font-awesome-icon icon="rocket" size="2x" />
        </div>
        <h4 class="text-uppercase">
          Updated List
        </h4>
        <p>Satellites are added as soon as they are launched</p>
      </b-col>
      <b-col cols="12" md="4" xl="3" class="my-3 my-md-0">
        <div class="pb-2">
          <font-awesome-icon icon="map-marker-alt" size="2x" />
        </div>
        <h4 class="text-uppercase">
          Your Location
        </h4>
        <p>See which satellites are orbiting and visible above you.</p>
      </b-col>
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
        <div v-if="satelliteList.length" class="wrapper justify-content-center">
          <div
            v-for="satellite in satelliteList"
            :key="satellite.number"
            class="box mb-5 mx-auto pt-3"
          >
            <satellite-card-details :satellite="satellite" />
          </div>
        </div>
        <div v-else>
          <h3 class="text-center py-4">
            No views
          </h3>
        </div>
      </b-col>
    </b-row>
    <!-- Advertising -->
    <b-row no-gutters class="my-4">
      <b-col cols="12">
        <a
          class="d-none d-md-flex justify-content-center"
          href="https://www.bluehost.com/track/upheredotspace/"
          target="_blank"
        >
          <img
            border="0"
            src="https://bluehost-cdn.com/media/partner/images/upheredotspace/760x80/760x80BW.png"
          />
        </a>
        <a
          class="d-flex d-md-none justify-content-center"
          href="https://www.bluehost.com/track/upheredotspace/"
          target="_blank"
        >
          <img
            border="0"
            src="https://bluehost-cdn.com/media/partner/images/upheredotspace/125x125/125x125PW.png"
          />
        </a>
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
    const title = "Real time satellite tracking and predictions";
    const description =
      "Real time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    const keywords =
      "real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
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
          content: keywords
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
        {
          name: "og:email",
          content: `${process.env.VUE_APP_EMAIL}`
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
          itemprop: "url",
          content: `${process.env.VUE_APP_URL}`
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
