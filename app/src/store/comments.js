import api from '../api/api';

export default {
  namespaced: true,
  state: {
    comments: [],
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
    async fetchComments({ commit }, articleId) {
      const res = await api.getComments(articleId);
      commit('SET_COMMENTS', res.data);
    },
    async addComment({ dispatch }, { articleId, comment }) {
      await api.createComment({ ...comment, id_article: articleId });
      await dispatch('fetchComments', articleId);
    },
    async deleteComment({ dispatch }, { articleId, commentId }) {
      await api.deleteComment(commentId);
      await dispatch('fetchComments', articleId);
    },
    async fetchAnalytics({ commit }, { dateFrom, dateTo }) {
      const res = await api.getCommentsAnalytics(dateFrom, dateTo);
      commit('SET_ANALYTICS', res.data);
    }
  }
};
