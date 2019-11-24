import axios from "axios";
const satellite = {
  namespaced: true,
  state: {
    interval: null,
    selectedSatelliteName: null,
    selectedSatelliteLocation: null,
    selectedSatelliteDetails: {},
    satellitePageNumber: 1,
    satelliteTextFilter: null,
    satelliteCategoryFilter: [],
    satelliteSort: null,
    infinateReset: 1,
    satelliteList: null,
    categoryList: null,
    cardVisibility: false,
    topList: [],
  },
  mutations: {
    setInterval(state, val) {
      state.interval = val;
    },
    setSelectedSatelliteName(state, name) {
      state.selectedSatelliteName = name;
    },
    setSelectedSatelliteLocation(state, data) {
      state.selectedSatelliteLocation = data;
    },
    setSelectedSatelliteDetails(state, data) {
      state.selectedSatelliteDetails = data;
    },
    setSatellitePage(state, number) {
      state.satellitePageNumber = number;
    },
    setSatelliteTextFilter(state, text) {
      state.satelliteTextFilter = text;
    },
    setSatelliteCategoryFilter(state, categories) {
      state.satelliteCategoryFilter = categories;
    },
    setSatelliteSort(state, val) {
      state.satelliteSort = val;
    },
    setInfinateReset(state, val) {
      state.infinateReset = val;
    },
    setSatelliteList(state, data) {
      if (state.satelliteList && state.satellitePageNumber > 1) {
        state.satelliteList = state.satelliteList.concat(data);
      } else {
        state.satelliteList = data;
      }
    },
    setCategoryList(state, data) {
      state.categoryList = data;
    },
    setCardVisibility(state, val) {
      state.cardVisibility = val;
    },
    setTopList(state, list) {
      state.topList = list;
    }
  },
  actions: {
    satelliteLocation({ commit }, name) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + "/satellite/" + encodeURIComponent(name) + "/location").then(
          response => {
            commit("setSelectedSatelliteLocation", response.data);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    satelliteDetails({ commit }, name) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + "/satellite/" + encodeURIComponent(name) + "/details").then(
          response => {
            commit("setSelectedSatelliteDetails", response.data);
            resolve();
          },
          error => {
            reject(error);
          }
        );
      });
    },
    fetchSatelliteList({ state, commit }) {
      let params = {
        page: state.satellitePageNumber,
        text: state.satelliteTextFilter,
        categories: state.satelliteCategoryFilter,
        sort: state.satelliteSort
      };
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + "/satellite/list", {
          params
        }).then(
          response => {
            commit("setSatelliteList", response.data);
            commit("setSatellitePage", state.satellitePageNumber += 1);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_URL + "/satellite/list/categories")
          .then(
            response => {
              commit("setCategoryList", response.data);
              resolve();
            },
            error => {
              reject(error);
            }
          );
      });
    },
    fetchTopList({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_URL + "/satellite/top")
          .then(
            response => {
              commit("setTopList", response.data);
              resolve();
            },
            error => {
              reject(error);
            }
          );
      });
    }
  },
  getters: {
    getInterval: state => {
      return state.interval;
    },
    getSelectedSatelliteName: state => {
      return state.selectedSatelliteName;
    },
    getSelectedSatelliteLocation: state => {
      return state.selectedSatelliteLocation;
    },
    getSelectedSatelliteDetails: state => {
      return state.selectedSatelliteDetails;
    },
    getSatellitePage: state => {
      return state.satellitePageNumber;
    },
    getSatelliteList: state => {
      return state.satelliteList;
    },
    getSatelliteTextFilter: state => {
      return state.satelliteTextFilter;
    },
    getSatelliteCategoryFilter: state => {
      return state.satelliteCategoryFilter;
    },
    getSatelliteSort: state => {
      return state.satelliteSort;
    },
    getInfinateReset: state => {
      return state.infinateReset;
    },
    getCategoryList: state => {
      return state.categoryList;
    },
    getCardVisibility: state => {
      return state.cardVisibility;
    },
    getTopList: state => {
      return state.topList;
    }
  }
};
export default satellite;
