import Vue from "vue";
import Router from "vue-router";
import staticRoutes from "@/routes/static.routes";
import satelliteRoutes from "@/routes/satellite.routes";
import apiRoutes from "@/routes/api.routes";

Vue.use(Router);

var allRoutes = [];
allRoutes = allRoutes.concat(staticRoutes, satelliteRoutes, apiRoutes);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: allRoutes
});
