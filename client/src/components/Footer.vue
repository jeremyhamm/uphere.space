<template>
  <b-row id="footer" class="fixed-bottom py-1">
    <b-col cols="6">
      <b-nav align="left" class="pl-4" small>
        <b-nav-text class="font-italic">
          &copy; {{ currentYear }} uphere.space
        </b-nav-text>
      </b-nav>
    </b-col>
    <b-col cols="6">
      <b-nav align="right" class="pr-3 d-none d-md-flex" small>
        <b-nav-item :href="config.VUE_APP_TWITTER" target="_blank">
          <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
        </b-nav-item>
        <b-nav-item :href="config.VUE_APP_FACEBOOK" target="_blank">
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
        </b-nav-item>
        <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'Privacy' }">Privacy</b-nav-item>
        <b-nav-item :to="{ name: 'Terms' }">Terms</b-nav-item>
        <b-nav-item :to="{ name: 'Contact' }">Contact</b-nav-item>
      </b-nav>
      <b-nav align="right" class="pr-3 d-md-none" small>
        <b-nav-item :href="config.VUE_APP_TWITTER" target="_blank">
          <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
        </b-nav-item>
        <b-nav-item :href="config.VUE_APP_FACEBOOK" target="_blank">
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
        </b-nav-item>
      </b-nav>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "AppFooter",
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

<style lang="scss"></style>
