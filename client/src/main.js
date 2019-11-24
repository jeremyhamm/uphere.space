import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "leaflet/dist/leaflet.css";
import VueMeta from "vue-meta";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import fontawesome from "@/utils/fontawesome.service";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.use(VueMeta);
Vue.use(BootstrapVue);
Vue.use(fontawesome);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Close xs nav menu after navigation
router.afterEach(() => {
  const slideMenu = document.querySelector("#slide-menu");
  if (slideMenu && slideMenu.classList.contains("slide-menu-show")) {
    document.querySelector("#slide-menu").classList.toggle("slide-menu-show");
    document.querySelector(".navbar-toggler").classList.toggle("open");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
