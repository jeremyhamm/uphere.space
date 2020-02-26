<template>
  <b-container fluid id="contact-form">
    <!-- Intro -->
    <b-row class="justify-content-center" v-if="!success">
      <b-col cols="12" md="6" xl="4">
        <h1 class="text-center">Contact</h1>
        <p class="text-center">
          Have questions? Want to advertise with us? Send us a line and we will
          get back to you as soon as possible.
        </p>
        <!-- Contact form -->
        <b-form @submit="sendMessage" v-if="!success">
          <!-- Name -->
          <b-row class="mt-3 justify-content-center">
            <b-col cols="12">
              <b-form-input
                v-model="form.name"
                placeholder="Enter your name"
                required
              />
            </b-col>
          </b-row>
          <!-- Email -->
          <b-row class="mt-4 justify-content-center">
            <b-col cols="12">
              <b-form-input
                v-model="form.email"
                placeholder="Enter your email"
                type="email"
                required
              />
            </b-col>
          </b-row>
          <!-- Message -->
          <b-row class="mt-4 justify-content-center">
            <b-col cols="12">
              <b-form-textarea
                id="textarea"
                v-model="form.message"
                placeholder="Enter your message"
                rows="4"
                max-rows="6"
                required
              />
            </b-col>
          </b-row>
          <!-- Submit -->
          <b-row class="mt-4 justify-content-center text-center">
            <b-col cols="12">
              <b-button type="submit" block variant="primary" v-if="!sending">
                Send Message
              </b-button>
              <loader v-else />
            </b-col>
          </b-row>
          <!-- Error Message -->
          <b-row class="justify-content-center mt-4">
            <b-col cols="12" md="6" xl="4">
              <b-alert variant="danger" :show="error" dismissible fade>
                There was an error, please try again.
              </b-alert>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <!-- Thanks Message -->
    <b-row class="justify-content-center mt-4" v-else>
      <b-col cols="12" md="6" xl="4">
        <p>
          Thanks for your message, we will get back to you as soon as possible!
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Loader from "@/views/Loader";
export default {
  name: "Contact",
  components: {
    loader: Loader
  },
  data() {
    return {
      config: process.env,
      form: {
        name: null,
        email: null,
        message: null
      },
      sending: false,
      success: null,
      error: null
    };
  },
  metaInfo() {
    const title = "Contact";
    const description =
      "Contact. Real time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    const keywords =
      "contact form, real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
    return {
      title: title,
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/contact`
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
          content: `${process.env.VUE_APP_URL}/contact`
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
          content: `${process.env.VUE_APP_URL}/contact`
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
  methods: {
    sendMessage(e) {
      this.sending = true;
      e.preventDefault();
      this.$store.dispatch("user/sendContactMessage", this.form).then(
        response => {
          this.sending = false;
          this.success = response;
        },
        error => {
          this.sending = false;
          this.error = error;
        }
      );
    }
  }
};
</script>

<style lang="scss"></style>
