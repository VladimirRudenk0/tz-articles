<template>
  <v-table>
    <thead>
      <tr>
        <th>Название</th>
        <th>Дата создания</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.name }}</td>
        <td>{{ article.create_date }}</td>
        <td>
          <v-btn @click="viewArticle(article.id)">Просмотр</v-btn>
          <v-btn @click="editArticle(article.id)">Редактировать</v-btn>
          <v-btn @click="deleteArticle(article.id)">Удалить</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import api from '../api/api';

export default {
  data() {
    return {
      articles: [],
      loading: false,
      error: null
    };
  },
  async created() {
    await this.loadArticles();
  },
  methods: {
    async loadArticles() {
      this.loading = true;
      try {
        const response = await api.getArticles();
        this.articles = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteArticle(id) {
      try {
        await api.deleteArticle(id);
        this.articles = this.articles.filter(article => article.id !== id);
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>
