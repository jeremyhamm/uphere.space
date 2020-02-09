<template>
  <b-row id="footer" class="fixed-bottom py-1">
    <b-col cols="6">
      <b-nav align="left" class="pl-4" small>
        <b-nav-text class="font-italic">&copy; {{ currentYear }} uphere.space</b-nav-text>
        <b-nav-item :href="config.VUE_APP_TWITTER" target="_blank" class="pl-3 d-none d-lg-flex">
          <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
        </b-nav-item>
        <b-nav-item :href="config.VUE_APP_FACEBOOK" target="_blank" class="d-none d-lg-flex">
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
        </b-nav-item>
      </b-nav>
    </b-col>
    <b-col cols="6">
      <!-- Desktop -->
      <b-nav align="right" class="pr-3 d-none d-lg-flex" small>
        <b-nav-item :to="{ name: 'API-Overview' }">API</b-nav-item>
        <b-nav-item :to="{ name: 'List' }">Satellites</b-nav-item>
        <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'Privacy' }">Privacy</b-nav-item>
        <b-nav-item :to="{ name: 'Terms' }">Terms</b-nav-item>
        <b-nav-item :to="{ name: 'Contact' }">Contact</b-nav-item>
      </b-nav>
      <!-- Mobile -->
      <b-nav align="right" class="pr-3 d-lg-none text-right" small>
        <b-nav-item :href="config.VUE_APP_TWITTER" target="_blank">
          <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
        </b-nav-item>
        <b-nav-item :href="config.VUE_APP_FACEBOOK" target="_blank">
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
        </b-nav-item>
        <b-nav-item-dropdown
          id="my-nav-dropdown"
          text="Links"
          toggle-class="nav-link-custom"
          right
        >
          <b-dropdown-item :to="{ name: 'API-Overview' }">API</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'List' }">Satellites</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'About' }">About</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Privacy' }">Privacy</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Terms' }">Terms</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Contact' }">Contact</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "App-Footer",
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    currentYear() {
      return this.$store.getters["user/getYear"];
    }
  }
};
</script>

<style lang="scss" scoped></style>
