<template>
  <b-container fluid>
    <!-- Welcome -->
    <b-row class="justify-content-center">
      <b-col cols="12" md="10" xl="8" class="text-center content-padding">
        <h4 class="my-3">
          Welcome to uphere.space, the premier application for realtime
          satellite tracking application. Over 2,800 satellates available to
          track, with more added daily. If you are interested in advertising
          please use the
          <a href="javascript:coid(0)" to="/contact">contact form</a> and we
          will get back to you soon.
        </h4>
      </b-col>
    </b-row>
    <!-- External buttons -->
    <b-row class="external-options justify-content-center text-center">
      <b-col cols="12" md="5" lg="4" xl="3" class="mt-5">
        <a
          href="https://www.producthunt.com/posts/uphere-space?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-uphere-space"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=173966&theme=light"
            alt="uphere . space - Realtime tracking and prediction for thousands of satellites | Product Hunt Embed"
            style="width: 250px; height: 54px;"
            width="250px"
            height="54px"
          />
        </a>
      </b-col>
      <b-col cols="12" md="5" lg="4" xl="3" class="mt-5">
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
    <!-- Advertising -->
    <advertising class="my-5" />
  </b-container>
</template>

<script>
import LandingPageAdvertising from "@/components/LandingPageAdvertising";
export default {
  name: "About",
  components: {
    advertising: LandingPageAdvertising
  },
  data() {
    return {
      config: process.env
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
