<template>
  <b-container fluid>
    <b-row class="content-top justify-content-center">
      <b-col cols="12">
        <!-- Intro -->
        <b-row class="content-top justify-content-center">
          <b-col cols="12">
            <h1 class="pb-2 text-center">
              <img
                :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo.svg`"
                class="img-fluid logo-filter mr-2"
                height="35"
                width="35"
              />
              API Documentation
            </h1>
          </b-col>
        </b-row>
        <!-- Overview -->
        <b-row class="mt-5">
          <b-col class="col-12 col-xl-8 offset-xl-2">
            <h4 class="text-uppercase font-weight-bold">Getting Started</h4>
          </b-col>
        </b-row>
        <b-row class="mt-3 d-flex justify-content-center">
          <b-col class="col-12 col-xl-4 offset-xl-2">
            <p>Base Url</p>
          </b-col>
          <b-col cols="12" md="6" xl="4">
            <p><code>https://uphere.space/api</code></p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "API-Documentation",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    return {
      title: "API Documentation",
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/development/api/documentation`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Public uphere.space API documentation. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "api,documentation,satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite"
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
          content: `${process.env.VUE_APP_URL}/development/api/documentation`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: `Contact Us`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Public uphere.space API documentation. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
          content: `Public uphere.space API documentation. The premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
