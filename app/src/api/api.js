import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export default {
  getArticles() {
    return api.get('/articles');
  },
  getArticle(id) {
    return api.get(`/articles/${id}`);
  },
  createArticle(article) {
    return api.post('/articles', article);
  },
  updateArticle(id, article) {
    return api.patch(`/articles/${id}`, article);
  },
  deleteArticle(id) {
    return api.delete(`/articles/${id}`);
  },

  getComments(articleId) {
    return api.get(`/comments/article/${articleId}`);
  },
  createComment(comment) {
    return api.post('/comments', comment);
  },
  deleteComment(id) {
    return api.delete(`/comments/${id}`);
  },
  getCommentsAnalytics(dateFrom, dateTo) {
    return api.get('/analytic/comments', {
      params: { dateFrom, dateTo }
    });
  }
};
