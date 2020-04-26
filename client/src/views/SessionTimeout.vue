<template>
  <b-container
    fluid
    id="sesson-timeout"
    class="d-flex align-items-center justify-content-center"
  >
    <b-row class="sesson-timeout-overlay p-5">
      <b-col cols="12" class="text-center text-color-light">
        <h1 class="font-weight-bold">Session Timeout</h1>
        <p>
          Sessions are limited to 30 minutes to save bandwidth. Please refresh
          to continue.
        </p>
        <b-nav align="center">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/list">Satellite List</b-nav-item>
          <b-nav-item to="/contact">Contact</b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
    <!-- Background attribution -->
    <b-row class="attribution">
      <b-col cols="12">
        <a
          style='background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px'
          href="https://unsplash.com/@nasa?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from NASA"
        >
          <span style="display:inline-block;padding:2px 3px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white"
              viewBox="0 0 32 32"
            >
              <title>unsplash-logo</title>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
          </span>
          <span style="display:inline-block;padding:2px 3px">NASA</span>
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Session-Timeout",
  metaInfo() {
    return {
      title: "Session Timeout",
      titleTemplate: "%s | uphere.space",
      meta: [
        {
          name: "prerender-status-code",
          content: 404
        },
        {
          name: "robots",
          content: "noindex, nofollow"
        }
      ]
    };
  },
  data() {
    return {
      config: process.env
    };
  }
};
</script>

<style lang="scss"></style>
