import axios from "axios";
const map = {
  namespaced: true,
  state: {
    map: null,
    basemap: {
      default: true,
      satellite: false,
      night: false,
      national_geographic: false
    },
    options: {
      tracking: false,
      footprint: false,
      path: true,
      shadow: true,
      launchSites: true
    },
    footprint: null,
    path: null,
    shadows: {
      civilTwilight: null,
      nauticalTwilight: null,
      astronomicalTwilight: null,
      night: null
    },
    launchSites: []
  },
  mutations: {
    setMap(state, val) {
      state.map = val;
    },
    setBasemap(state, val) {
      state.basemap = val;
    },
    setFootprint(state, val) {
      state.footprint = val;
    },
    setPath(state, val) {
      state.path = val;
    },
    setLaunchSites(state, val) {
      state.launchSites = val;
    }
  },
  actions: {
    launchSites({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_URL + "/satellite/list/launch-sites", {
            headers: { "X-RapidAPI-Key": process.env.VUE_APP_API_KEY }
          })
          .then(
            response => {
              commit("setLaunchSites", response.data);
              resolve(response);
            },
            error => {
              reject(error);
            }
          );
      });
    }
  },
  getters: {
    getMap: state => {
      return state.map;
    },
    getBasemap: state => {
      return state.basemap;
    },
    getAllOptions: state => {
      return state.options;
    },
    getOptionByName: state => name => {
      return state.options[name];
    },
    getFootprint: state => {
      return state.footprint;
    },
    getPath: state => {
      return state.path;
    },
    getShadows: state => {
      return state.shadows;
    },
    getLaunchSites: state => {
      return state.launchSites;
    }
  }
};
export default map;
