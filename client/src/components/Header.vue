<template>
  <div>
    <b-navbar id="header" toggleable="md" fixed="top">
      <b-navbar-brand align-v="center" to="/">
        <img
          :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo.svg`"
          class="img-fluid logo-filter mr-2"
          height="35"
          width="35"
        />
        <img
          :src="`${config.VUE_APP_SPACES_URL}/images/branding/logo-lg.png`"
          alt="logo"
          class="d-none d-md-inline img-fluid"
        />
      </b-navbar-brand>
      <b-nav-text class="d-md-none justify-content-end">
        <small>UTC</small>
        {{ utcTime }}
      </b-nav-text>
      <b-navbar-toggle
        @click="openSlideMenu(toggleSlideMenu)"
        target="javascript:void(0)"
      >
        <span></span>
        <span></span>
        <span></span>
      </b-navbar-toggle>
      <b-navbar-nav
        class="d-none d-md-flex justify-content-end align-items-center w-100"
      >
        <b-nav-item :to="satelliteListNav()" class="font-weight-bold">
          SATELLITES
        </b-nav-item>
        <b-nav-text>
          <small class="ml-4 mr-2">UTC {{ utcTime }}</small>
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
    <!-- Slide menu -->
    <b-nav
      id="slide-menu"
      vertical
      class="w-100 h-100 d-flex d-md-none align-items-center text-center"
    >
      <b-nav-item
        :to="{ name: 'List' }"
        class="font-weight-bold text-uppercase"
      >
        Satellites
      </b-nav-item>
      <b-nav-item
        :to="{ name: 'About' }"
        class="font-weight-bold text-uppercase"
      >
        About
      </b-nav-item>
      <b-nav-item
        :to="{ name: 'Privacy' }"
        class="font-weight-bold text-uppercase"
      >
        Privacy
      </b-nav-item>
      <b-nav-item
        :to="{ name: 'Terms' }"
        class="font-weight-bold text-uppercase"
      >
        Terms
      </b-nav-item>
      <b-nav-item
        :to="{ name: 'Contact' }"
        class="font-weight-bold text-uppercase"
      >
        Contact
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: process.env,
      toggleSlideMenu: false
    };
  },
  created() {
    this.init();
  },
  computed: {
    utcTime() {
      return this.$store.getters["user/getUTCTime"];
    },
    satelliteTextFilter() {
      return this.$store.getters["satellite/getSatelliteTextFilter"];
    }
  },
  methods: {
    init() {
      this.$store.commit("user/setUTCTime");
      this.updateTime();
    },
    updateTime() {
      setInterval(() => {
        this.$store.commit("user/setUTCTime");
      }, 1000);
    },
    openSlideMenu(val) {
      val = !val;
      this.toggleSlideMenu = val;
      document.querySelector("#slide-menu").classList.toggle("slide-menu-show");
      document.querySelector(".navbar-toggler").classList.toggle("open");
    },
    satelliteListNav() {
      return this.satelliteTextFilter ? 
        { name: "List", query: { search: this.satelliteTextFilter } } : { name: "List" };
    }
  }
};
</script>

<style lang="scss"></style>
