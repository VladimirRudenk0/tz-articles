<template>
  <div>
    <h1>{{ article.name }}</h1>
    <p>{{ article.article_text }}</p>
    <CommentList :comments="comments" @edit="editComment" @delete="deleteComment" />
    <AddComment @submit="addComment" />
    <v-btn @click="editArticle">Редактировать статью</v-btn>
    <v-btn @click="deleteArticle">Удалить статью</v-btn>
  </div>
</template>

<script>
import api from '../api/api';
import CommentList from './CommentList.vue';
import AddComment from './AddComment.vue';

export default {
  components: { CommentList, AddComment },
  data() {
    return {
      article: null,
      comments: [],
      loading: false
    };
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const articleId = this.$route.params.id;
        const [articleRes, commentsRes] = await Promise.all([
          api.getArticle(articleId),
          api.getComments(articleId)
        ]);
        this.article = articleRes.data;
        this.comments = commentsRes.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async addComment(commentData) {
      try {
        const response = await api.createComment({
          ...commentData,
          id_article: this.$route.params.id
        });
        this.comments.push(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
