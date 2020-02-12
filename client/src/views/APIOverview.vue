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
          API Overview
        </h1>
        <h4 class="pt-2">
          Welcome to the premier API for real-time satellite tracking!
          Satellites are added to the database and available for tracking as
          soon as they are launched. Any questions for comments can be submitted
          via the
          <router-link class="text-dark" :to="{ name: 'Contact' }">contact</router-link>
          page.
        </h4>
        <!-- Get Access -->
        <b-row class="text-center mt-5">
          <b-col cols="12">
            <a :href="config.VUE_APP_API_DOCS" target="_blank">
              <img
                src="https://storage.googleapis.com/code-snippets/connect-on-rapidapi-light.png"
                width="215"
                alt="Connect on RapidAPI"
              />
            </a>
          </b-col>
        </b-row>
        <!-- Documentation -->
        <b-row class="text-center mt-5">
          <b-col cols="12">
            <h3>
              <router-link to="/development/api/documentation"
                >Documentation</router-link
              >
            </h3>
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
          href: `${process.env.VUE_APP_URL}/development/api/overview`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Public uphere.space API overview. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "api,overview,satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite"
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
          content: `${process.env.VUE_APP_URL}/development/api/overview`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Contact Us`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Public uphere.space API overview. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
          content: `Public uphere.space API overview. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
a {
  &:hover {
    text-decoration: none;
  }
}
.content-top {
  padding-top: 100px;
}
</style>
