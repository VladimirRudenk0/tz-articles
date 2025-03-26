import api from '../api/api';

export default {
  namespaced: true,
  state: {
    articles: [],
    currentArticle: null
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_CURRENT_ARTICLE(state, article) {
      state.currentArticle = article;
    }
  },
  actions: {
    async fetchArticles({ commit }) {
      const res = await api.getArticles();
      commit('SET_ARTICLES', res.data);
    },
    async fetchArticle({ commit }, id) {
      const res = await api.getArticle(id);
      commit('SET_CURRENT_ARTICLE', res.data);
    },
    async createArticle({ dispatch }, article) {
      await api.createArticle(article);
      await dispatch('fetchArticles');
    },
    async updateArticle({ commit, dispatch }, { id, article }) {
      const res = await api.updateArticle(id, article);
      commit('SET_CURRENT_ARTICLE', res.data);
      await dispatch('fetchArticles');
    },
    async deleteArticle({ dispatch }, id) {
      await api.deleteArticle(id);
      await dispatch('fetchArticles');
    }
  }
};
