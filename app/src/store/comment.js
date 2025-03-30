import api from '../api/api';

export default {
  namespaced: true,
  state: {
    commentsByArticle: {},
    analytics: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_COMMENTS(state, { articleId, comments }) {
      state.commentsByArticle = {
        ...state.commentsByArticle,
        [articleId]: comments
      };
    },
    SET_ANALYTICS(state, analytics) {
      state.analytics = analytics;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async getCommentsForArticle({ commit }, articleId) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const comments = await api.getCommentsForArticle(articleId);
        commit('SET_COMMENTS', { articleId, comments });
      } catch (error) {
        commit('SET_ERROR', error.message);
        console.error('Ошибка загрузки комментариев:', error);
      } finally {
        commit('SET_LOADING', false);
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
