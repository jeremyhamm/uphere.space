<template>
  <b-container fluid>
    <b-row class="administration justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <h1 class="text-center mb-4">Terms of Service</h1>
        <h3>1. Terms</h3>
        <p>
          By accessing the website at
          <a class="text-color-dark" href="https://uphere.space"
            >https://uphere.space</a
          >, you are agreeing to be bound by these terms of service, all
          applicable laws and regulations, and agree that you are responsible
          for compliance with any applicable local laws. If you do not agree
          with any of these terms, you are prohibited from using or accessing
          this site. The materials contained in this website are protected by
          applicable copyright and trademark law.
        </p>
        <h3>2. Use License</h3>
        <ol type="a">
          <li>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on uphere.space's website for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
            <ol type="i">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on uphere.space's website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ol>
          </li>
          <li>
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by uphere.space at any
            time. Upon terminating your viewing of these materials or upon the
            termination of this license, you must destroy any downloaded
            materials in your possession whether in electronic or printed
            format.
          </li>
        </ol>
        <h3>3. Disclaimer</h3>
        <ol type="a">
          <li>
            The materials on uphere.space's website are provided on an 'as is'
            basis. uphere.space makes no warranties, expressed or implied, and
            hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </li>
          <li>
            Further, uphere.space does not warrant or make any representations
            concerning the accuracy, likely results, or reliability of the use
            of the materials on its website or otherwise relating to such
            materials or on any sites linked to this site.
          </li>
        </ol>
        <h3>4. Limitations</h3>
        <p>
          In no event shall uphere.space or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on uphere.space's website, even if
          uphere.space or a uphere.space authorized representative has been
          notified orally or in writing of the possibility of such damage.
          Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or
          incidental damages, these limitations may not apply to you.
        </p>
        <h3>5. Accuracy of materials</h3>
        <p>
          The materials appearing on uphere.space's website could include
          technical, typographical, or photographic errors. uphere.space does
          not warrant that any of the materials on its website are accurate,
          complete or current. uphere.space may make changes to the materials
          contained on its website at any time without notice. However
          uphere.space does not make any commitment to update the materials.
        </p>
        <h3>6. Links</h3>
        <p>
          uphere.space has not reviewed all of the sites linked to its website
          and is not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by uphere.space of
          the site. Use of any such linked website is at the user's own risk.
        </p>
        <h3>7. Modifications</h3>
        <p>
          uphere.space may revise these terms of service for its website at any
          time without notice. By using this website you are agreeing to be
          bound by the then current version of these terms of service.
        </p>
        <h3>8. Governing Law</h3>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of CA and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Terms",
  data() {
    return {
      config: process.env
    };
  },
  metaInfo() {
    const title = "Terms and Conditions";
    const description =
      "Terms and Conditions. Real time tracking and predictions for thousands of satellites for your location. Find the International Space Station, the Hubble Space telescope and many more!";
    const keywords =
      "terms and conditions, real time tracking, passes, orbit, orbiters, satellite, satellites, satellite tracking, Tracking, Position, ISS, Mir, Hubble, Space shuttle, suitsat, geostationary, GOES, NOAA, TV satellites, weather, Iridium, Intelsat, Globalstar, amateur radio, GPS, Military Satellites, Cubesat, Galileo, Beidou, Mapping, Spacex, Uphere";
    return {
      title: title,
      titleTemplate: "%s | uphere.space",
      link: [
        {
          rel: "canonical",
          href: `${process.env.VUE_APP_URL}/terms`
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
          content: `${process.env.VUE_APP_URL}/terms`
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
