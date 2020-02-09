const imageMixin = {
  data() {
    return {
      config: process.env
    };
  },
  methods: {
    satelliteImage(number, name) {
      if (name.includes("STARLINK")) {
        number = "STARLINK";
      }
      if (name.includes("GLOBALSTAR")) {
        number = "GLOBALSTAR";
      }
      if (name.includes("GONETS") || name.includes("STRELA")) {
        number = "GONETS";
      }
      if (name.includes("GORIZONT")) {
        number = "GORIZONT";
      }
      return `${
        this.config.VUE_APP_SPACES_URL
      }/images/satellites_numbers/${number}.webp`;
    }
  }
};

export default imageMixin;
