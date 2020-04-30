import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const utilsMixin = {
  computed: {
    loading: {
      get: function() {
        return this.$store.getters["utils/getLoading"];
      },
      set: function(value) {
        this.loading = value;
      }
    }
  },
  methods: {
    formatFloat(height) {
      return parseFloat(height).toFixed(2);
    },
    formatDate(date) {
      return dayjs
        .unix(date)
        .utc()
        .format("MM/DD/YY");
    },
    formatLaunchDate(date) {
      return dayjs(date)
        .utc()
        .format("MM/DD/YY");
    },
    formatTime(time) {
      return dayjs
        .unix(time)
        .utc()
        .format("H:mm:ss");
    },
    getCompassDirection(deg) {
      switch (true) {
        case deg >= 348.76 && deg <= 11.25:
          return "N";
        case deg >= 11.26 && deg <= 33.75:
          return "NNE";
        case deg >= 33.76 && deg <= 56.25:
          return "NE";
        case deg >= 56.26 && deg <= 78.75:
          return "ENE";
        case deg >= 78.76 && deg <= 101.25:
          return "E";
        case deg >= 101.26 && deg <= 123.75:
          return "ESE";
        case deg >= 123.76 && deg <= 146.25:
          return "SE";
        case deg >= 146.26 && deg <= 168.75:
          return "SSE";
        case deg >= 168.76 && deg <= 191.25:
          return "S";
        case deg >= 191.26 && deg <= 213.75:
          return "SSW";
        case deg >= 213.76 && deg <= 236.25:
          return "SW";
        case deg >= 236.26 && deg <= 258.75:
          return "WSW";
        case deg >= 258.76 && deg <= 281.25:
          return "W";
        case deg >= 281.26 && deg <= 303.75:
          return "WNW";
        case deg >= 303.76 && deg <= 326.25:
          return "NW";
        case deg >= 326.26 && deg <= 348.75:
          return "NNW";
        default:
          return "N/A";
      }
    },
    formatMetricUnits(val) {
      if (this.units === "metric") {
        return parseFloat(val * 1.60934).toFixed(2);
      } else {
        return parseFloat(val).toFixed(2);
      }
    }
  }
};

export default utilsMixin;
