import { createStore } from 'vuex';
import article from './article';
import comment from './comment';

export default createStore ({
  modules: {
    article,
    comment
  },
  actions: {
    showSnackbar({ commit }, payload) {
      commit('SET_SNACKBAR', payload);
    }
  },
  mutations: {
    SET_SNACKBAR(state, payload) {
      state.snackbar = {
        show: true,
        text: payload.text,
        color: payload.color || 'success'
      };
    }
  },
});
