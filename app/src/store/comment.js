import api from '../api/api';

export default {
  namespaced: true,
  state: {
    comment: [],
    analytics: []
  },
  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_ANALYTICS(state, analytics) {
      state.analytics = analytics;
    }
  },
  actions: {
    async getCommentsForArticle({ commit }, articleId) {
      try {
        const comment = await api.getComments(articleId);
        commit('SET_COMMENTS', comment);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        throw error;
      }
    },

    async addComment({ dispatch }, { articleId, comment }) {
      try {
        await api.createComment({ ...comment, id_article: articleId });
        await dispatch('getCommentsForArticle', articleId);
      } catch (error) {
        console.error('Failed to add comment:', error);
        throw error;
      }
    },

    async deleteComment({ dispatch }, { articleId, commentId }) {
      try {
        await api.deleteComment(commentId);
        await dispatch('getCommentsForArticle', articleId);
      } catch (error) {
        console.error(`Failed to delete comment ${commentId}:`, error);
        throw error;
      }
    },

    async fetchAnalytics({ commit }, { dateFrom, dateTo }) {
      try {
        const analytics = await api.getCommentsAnalytics(dateFrom, dateTo);
        commit('SET_ANALYTICS', analytics);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        throw error;
      }
    }
  }
};
