import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    articles: [],
    comments: [],
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
  },
  actions: {
    async fetchArticles({ commit }) {
      const response = await axios.get('/articles');
      commit('SET_ARTICLES', response.data);
    },
    async fetchComments({ commit }, articleId) {
      const response = await axios.get(`/articles/${articleId}/comments`);
      commit('SET_COMMENTS', response.data);
    },
  },
});
