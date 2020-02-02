const listMixin = {
  data() {
    return {
      config: process.env
    };
  },
  mounted() {
    this.addCardErrorHandle();
  },
  updated() {
    this.addCardErrorHandle();
  },
  methods: {
    addCardErrorHandle() {
      if (this.$refs.card !== undefined) {
        this.$refs.card.querySelector("img").onerror = this.showDefault;
      }
    },
    showDefault(evt) {
      evt.target.src =
        this.config.VUE_APP_SPACES_URL +
        "/images/satellites_numbers/default.webp";
    }
  }
};

export default listMixin;
