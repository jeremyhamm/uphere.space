const utils = {
  namespaced: true,
  state: {
    loading: null
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val;
    }
  },
  actions: {},
  getters: {
    getLoading: state => {
      return state.loading;
    }
  }
};
export default utils;
