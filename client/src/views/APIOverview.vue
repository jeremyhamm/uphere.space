<template>
  <b-container fluid>
    <!-- Intro -->
    <b-row class="content-top justify-content-center">
      <b-col cols="12" md="10" xl="8" class="text-justify">
        <h1 class="pb-2 text-center">
          <img
            :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo.svg`"
            class="img-fluid logo-filter mr-2"
            height="35"
            width="35"
          />
          API {{ config.VUE_APP_API_VERSION }}
        </h1>
        <h4 class="pt-2">
          This API provides access to a number of real-time satellite tracking
          RESTful services. Any questions for comments can be submitted via the
          <router-link :to="{ name: 'Contact' }">contact</router-link>
          page.
        </h4>
        <!-- Get Access -->
        <b-row class="text-center mt-5">
          <b-col cols="12">
            <!-- <a :href="config.VUE_APP_API_DOCS" target="_blank">
              <img
                src="https://storage.googleapis.com/code-snippets/connect-on-rapidapi-light.png"
                width="215"
                alt="Connect on RapidAPI"
              />
            </a> -->
            <p>Coming Soon!</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "API-Overview",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    return {
      title: "API Overview",
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/satellites/api`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Public uphere.space API. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite"
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
          content: `${process.env.VUE_APP_URL}/satellites/api`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Contact Us`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Public uphere.space API. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
          content: `Contact Us`
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: `Public uphere.space API. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
  methods: {}
};
</script>

<style lang="scss" scoped>
.content-top {
  padding-top: 100px;
}
</style>
