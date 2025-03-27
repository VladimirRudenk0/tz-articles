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
  }
});
