<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <h1>Sitemap</h1>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="12" md="8" lg="6">
        
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Sitemap",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    const title = "Sitemap";
    const description =
      "Sitemap. Real time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    const keywords =
      "user sitemap, real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
    return {
      title: title,
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/sitemap`
        }
      ],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: description
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: keywords
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
          content: `${process.env.VUE_APP_URL}/terms`
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: title
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: description
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
          content: title
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: description
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
          content: `${process.env.VUE_APP_URL}/sitemap`
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
  }
};
</script>

<style lang="scss"></style>
