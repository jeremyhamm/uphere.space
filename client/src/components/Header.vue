<template>
  <div>
    <b-navbar id="header" toggleable="lg" fixed="top">
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
          class="d-none d-lg-inline img-fluid"
        />
      </b-navbar-brand>
      <!-- Time -->
      <b-nav-text class="d-lg-none justify-content-end">
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
        class="d-none d-lg-flex justify-content-end align-items-center w-100"
      >
        <!-- Search -->
        <b-nav-form class="mr-4" @submit.prevent="searchSubmit">
          <b-form-input
            v-model="satelliteTextFilter"
            placeholder="Search for satellites..."
            class="search-input-right"
          ></b-form-input>
          <div v-if="satelliteTextFilter" class="clear-search-container">
            <div class="clear-search" @click="satelliteTextFilter = null">
              <font-awesome-icon icon="times" />
            </div>
          </div>
          <b-button
            type="submit"
            variant="primary"
            class="search-input-left"
            :disabled="!satelliteTextFilter"
          >
            <font-awesome-icon icon="search" />
          </b-button>
        </b-nav-form>
        <!-- Links -->
        <b-nav-item :to="satelliteListNav()" class="font-weight-bold">
          SATELLITES
        </b-nav-item>
        <b-nav-item :to="{ name: 'API-Overview' }" class="font-weight-bold">
          API
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
      class="w-100 d-flex d-lg-none align-items-center text-center"
    >
      <!-- Search -->
      <b-nav-form
        class="my-4 justify-content-center"
        @submit.prevent="searchSubmit"
      >
        <b-form-input
          v-model="satelliteTextFilter"
          placeholder="Search for satellites..."
          class="mb-1"
          size="sm"
        ></b-form-input>
        <b-button
          type="submit"
          size="sm"
          variant="primary"
          block
          :disabled="!satelliteTextFilter"
        >
          <font-awesome-icon icon="search" />
        </b-button>
      </b-nav-form>
      <!-- Links -->
      <b-nav-item
        :to="{ name: 'List' }"
        class="font-weight-bold text-uppercase"
      >
        Satellites
      </b-nav-item>
      <b-nav-item :to="{ name: 'API-Overview' }" class="font-weight-bold">
        API
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
    satelliteTextFilter: {
      get() {
        return this.$store.getters["satellite/getSatelliteTextFilter"];
      },
      set(term) {
        this.$store.commit("satellite/setSatelliteTextFilter", term);
      }
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
      if (this.satelliteTextFilter) {
        return {
          name: "List",
          query: { search: this.satelliteTextFilter }
        };
      } else {
        return { name: "List" };
      }
    },
    searchSubmit() {
      this.$store.commit("satellite/setSatellitePage", 1);
      this.$router.push({
        name: "List",
        query: { search: this.satelliteTextFilter }
      });
    }
  }
};
</script>

<style lang="scss"></style>
