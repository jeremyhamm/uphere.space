const map = {
  namespaced: true,
  state: {
    map: null,
    basemap: null,
    options: {
      tracking: false,
      footprint: false,
      path: true,
      shadow: true
    },
    footprint: null,
    path: null,
    shadows: {
      civilTwilight: null,
      nauticalTwilight: null,
      astronomicalTwilight: null,
      night: null
    }
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
    }
  },
  actions: {},
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
    }
  }
};
export default map;
