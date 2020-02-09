<template>
  <div id="app">
    <app-header v-if="$route.name !== 'Home'" />
    <router-view />
    <app-footer :class="$route.name === 'Home' ? 'position-relative no-gutters' : 'fixed-bottom'" />
  </div>
</template>

<script>
import utilsMixin from "@/mixins/utils.mixin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "app",
  mixins: [utilsMixin],
  components: {
    "app-header": Header,
    "app-footer": Footer
  }
};
</script>

<style lang="scss">
@import "/assets/scss/app.scss";
</style>
