import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default {
  async getArticles() {
    try {
      const response = await api.get('/articles');
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  async getArticle(id) {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      throw error;
    }
  },

  async createArticle(article) {
    try {
      const response = await api.post('/articles', article);
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },

  async updateArticle(id, article) {
    try {
      const response = await api.put(`/articles/${id}`, article);
      return response.data;
    } catch (error) {
      console.error(`Error updating article ${id}:`, error);
      throw error;
    }
  },

  async deleteArticle(id) {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting article ${id}:`, error);
      throw error;
    }
  },

  async getCommentsForArticle(articleId) {
    try {
      const response = await api.get(`/comments/article/${articleId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for article ${articleId}:`, error);
      throw error;
    }
  },

  async createComment(comment) {
    try {
      const response = await api.post('/comments', comment);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  async deleteComment(id) {
    try {
      const response = await api.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comment ${id}:`, error);
      throw error;
    }
  },

  async getCommentsAnalytics(dateFrom, dateTo) {
    try {
      const response = await api.get('/analytics/comments', {
        params: { dateFrom, dateTo }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};
