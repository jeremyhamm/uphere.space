<template>
  <b-container fluid>
    <b-row class="administration justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <h2 class="text-center mb-4">Privacy Policy</h2>
        <p>
          Your privacy is important to us. It is uphere.space's policy to
          respect your privacy regarding any information we may collect from you
          across our website,
          <a href="https://uphere.space">https://uphere.space</a>, and other
          sites we own and operate.
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
    return {
      title: "Privacy Policy",
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
          content:
            "Privacy policy for uphere.space, the premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!"
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "privacy policy,conditions,satellite,orbit,tracking,map,mapping,nasa,iss,spacex,us satellite,us weather satellite"
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
          content: `About Us`
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: `Privacy policy for uphere.space, the premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
          content: `Privacy Policy`
        },
        {
          vmid: "twitter:description",
          name: "twitter:description",
          content: `Privacy policy for uphere.space, the premier real-time tracking and predictor for thousands of satellites. Find the International Space Station, the Hubble Space telescope and many more!`
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
  }
};
</script>

<style lang="scss"></style>
