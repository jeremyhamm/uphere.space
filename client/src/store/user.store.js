import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import axios from "axios";
dayjs.extend(utc);

const user = {
  namespaced: true,
  state: {
    utcTime: dayjs()
      .utc()
      .format("H:mm:ss"),
    utcDate: dayjs()
      .utc()
      .format("MM/DD/YY"),
    year: dayjs()
      .utc()
      .format("YYYY"),
    location: null,
    marker: null,
    icon: {
      iconUrl: `${process.env.VUE_APP_SPACES_URL}/images/icons/home.png`,
      iconSize: [50, 50],
      iconAnchor: [25, 50]
    }
  },
  mutations: {
    setUTCTime(state) {
      state.utcTime = dayjs()
        .utc()
        .format("H:mm:ss");
    },
    setUTCDate(state) {
      state.utcDate = dayjs()
        .utc()
        .format("MM/DD/YY");
    },
    setLocation(state, location) {
      state.location = location;
    },
    setMarker(state, marker) {
      state.marker = marker;
    }
  },
  actions: {
    userLocation({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_API_URL + "/user/location").then(
          response => {
            commit("setLocation", response.data);
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    sendContactMessage({}, message) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + "/user/contact", message).then(
          response => {
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
    getUTCTime: state => {
      return state.utcTime;
    },
    getUTCDate: state => {
      return state.utcDate;
    },
    getYear: state => {
      return state.year;
    },
    getLocation: state => {
      return state.location || null;
    },
    getMarker: state => {
      return state.marker || null;
    },
    getIcon: state => {
      return state.icon;
    }
  }
};
export default user;
