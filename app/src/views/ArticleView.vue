<template>
  <div>
    <h1>{{ article.name }}</h1>
    <p>{{ article.article_text }}</p>

    <CommentList
      :comments="comments"
      @delete="deleteComment"
    />

    <AddComment @submit="addComment" />

    <v-btn @click="editArticle">Редактировать</v-btn>
    <v-btn @click="deleteArticle">Удалить</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CommentList from '../components/CommentList.vue';
import AddComment from '../components/AddComment.vue';

export default {
  components: { CommentList, AddComment },
  props: ['id'],
  computed: {
    ...mapState('articles', ['currentArticle']),
    ...mapState('comments', ['comments']),
    article() {
      return this.currentArticle;
    }
  },
  methods: {
    ...mapActions('articles', ['fetchArticle', 'deleteArticle']),
    ...mapActions('comments', ['fetchComments', 'addComment', 'deleteComment']),
    async addComment(comment) {
      await this.addComment({
        articleId: this.id,
        comment
      });
    }
  },
  async created() {
    await Promise.all([
      this.fetchArticle(this.id),
      this.fetchComments(this.id)
    ]);
  }
};
</script>
