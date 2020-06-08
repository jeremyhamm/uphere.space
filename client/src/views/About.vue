<template>
  <b-container
    fluid
    id="about-container"
    class="d-flex align-items-center justify-content-center"
  >
    <b-row no-gutters class="justify-content-center">
      <b-col cols="12" md="10" lg="8" xl="6">
        <!-- Welcome -->
        <b-row class="about-overlay justify-content-center pt-4">
          <b-col cols="12" class="text-center">
            <h1 class="text-center mb-4">Welcome</h1>
            <p class="my-3">
              Welcome to uphere.space, the premier application for real-time
              satellite tracking application. Over 3,200 satellates available to
              track, with more added daily. If you are interested in advertising
              please use the
              <a href="javascript:void(0)" to="/contact">contact form</a> and we
              will get back to you soon.
            </p>
          </b-col>
        </b-row>
        <!-- External buttons -->
        <b-row
          class="external-options justify-content-center text-center about-overlay pb-4"
        >
          <b-col cols="12" md="5" lg="4" class="mt-5">
            <a
              href="https://www.producthunt.com/posts/uphere-space?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-uphere-space"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=173966&theme=light"
                alt="uphere . space - real-time tracking and prediction for thousands of satellites | Product Hunt Embed"
                style="width: 250px; height: 54px;"
                width="250px"
                height="54px"
              />
            </a>
          </b-col>
          <b-col cols="12" md="5" lg="4" class="mt-5">
            <a
              class="bmc-button"
              target="_blank"
              href="https://www.buymeacoffee.com/Xorb9kwn0"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a coffee"
              />
              <span style="margin-left:15px;font-size:19px !important;"
                >Buy me a coffee</span
              >
            </a>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- Background attribution -->
    <b-row class="attribution position-absolute">
      <b-col cols="12">
        <a
          style='background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px'
          href="https://unsplash.com/@nasa?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from NASA"
          ><span style="display:inline-block;padding:2px 3px"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white"
              viewBox="0 0 32 32"
            >
              <title>unsplash-logo</title>
              <path
                d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
              ></path></svg></span
          ><span style="display:inline-block;padding:2px 3px">NASA</span></a
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    const title = "About | Real-time satellite tracking and predictions";
    const description =
      "Real-time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    const keywords =
      "real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
    return {
      title: title,
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/about`
        }
      ],
      meta: [
        {
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
          property: "og:site_name",
          content: "uphere.space"
        },
        {
          name: "og:type",
          content: "website"
        },
        {
          name: "og:url",
          content: `${process.env.VUE_APP_URL}/about`
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
          content: `${process.env.VUE_APP_URL}/about`
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

<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";
#about-container {
  background-image: url("https://resources-uphere.sfo2.cdn.digitaloceanspaces.com/images/branding/about.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: $white;
  .about-overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.content-padding {
  margin-top: 150px;
}
.bmc-button img {
  width: 35px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}
.bmc-button {
  padding: 7px 5px 7px 10px !important;
  line-height: 35px !important;
  height: 51px !important;
  min-width: 217px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  color: $white;
  background-color: $secondary;
  border-radius: 5px !important;
  border: 1px solid transparent !important;
  padding: 7px 5px 7px 10px !important;
  font-size: 20px !important;
  letter-spacing: -0.08px !important;
  margin: 0 auto !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;
}
.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  text-decoration: none !important;
  opacity: 0.85 !important;
  color: $white !important;
}
.external-options {
  margin-bottom: 100px;
}
.attribution {
  position: absolute;
  bottom: 52px;
  left: 10px;
}
</style>
