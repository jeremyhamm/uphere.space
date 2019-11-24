import Vue from "vue";
import Vuex from "vuex";
import map from "@/store/map.store";
import satellite from "@/store/satellite.store";
import user from "@/store/user.store";
import utils from "@/store/utils.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    map,
    satellite,
    user,
    utils
  }
});
