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
  }
};

export default utilsMixin;
