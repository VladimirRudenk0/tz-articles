import api from '../api/api';

export default {
  namespaced: true,
  state: {
    articles: []
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    }
  },
  actions: {
    async getAllArticles({ commit }) {
      try {
        const response = await api.getArticles();
        commit('SET_ARTICLES', response);
      } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }
    },
    async addArticle({ dispatch }, article) {
      try {
        const response = await api.createArticle(article);
        await dispatch('getAllArticles');
        return response;
      } catch (error) {
        console.error('Error adding article:', error);
        throw error;
      }
    },
    async modifyArticle({ dispatch }, { id, data }) {
      try {
        await api.updateArticle(id, data);
        await dispatch('getAllArticles');
      } catch (error) {
        console.error('Error updating article:', error);
        throw error;
      }
    },
    async removeArticle({ dispatch }, id) {
      try {
        await api.deleteArticle(id);
        await dispatch('getAllArticles');
      } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
      }
    }
  }
};
