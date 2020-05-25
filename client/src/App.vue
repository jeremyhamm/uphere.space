<template>
  <div id="app">
    <app-header v-if="$route.name !== 'Home'" />
    <router-view />
    <app-footer
      :class="
        $route.name === 'Home' ? 'position-relative no-gutters' : 'fixed-bottom'
      "
    />
  </div>
</template>

<script>
import utilsMixin from "@/mixins/utils.mixin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
//import ScriptService from "@/services/script.service";
export default {
  name: "app",
  mixins: [utilsMixin],
  components: {
    "app-header": Header,
    "app-footer": Footer
  },
  created() {
    // Load sharethis.com buttons
    // const attributes = {
    //   "type": "text/javascript",
    //   "src":"https://platform-api.sharethis.com/js/sharethis.js#property=5eb5dcb5cb9da90012156148&product=inline-share-buttons",
    //   "async": "async"
    // };
    // ScriptService.loadScript(attributes);
  }
};
</script>

<style lang="scss">
@import "/assets/scss/app.scss";
</style>
