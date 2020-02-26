<template>
  <b-container fluid>
    <b-row class="administration justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <h2 class="text-center mb-4">Privacy Policy</h2>
        <p>
          Your privacy is important to us. It is uphere.space's policy to
          respect your privacy regarding any information we may collect from you
          across our website,
          <a class="text-color-dark" href="https://uphere.space"
            >https://uphere.space</a
          >, and other sites we own and operate.
        </p>
        <p>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </p>
        <p>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </p>
        <p>
          We don’t share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </p>
        <p>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </p>
        <p>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </p>
        <p>
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <p>This policy is effective as of 4 September 2019.</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Privacy",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    const title = "Privacy Policy";
    const description =
      "Privacy policy. Real time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    const keywords =
      "privacy policy, real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
    return {
      title: title,
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/privacy`
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
          content: `${process.env.VUE_APP_URL}/privacy`
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
          content: `${process.env.VUE_APP_URL}/privacy`
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
