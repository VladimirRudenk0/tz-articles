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
import CommentList from './CommentList.vue';
import AddComment from './AddComment.vue';

export default {
  components: {
    CommentList,
    AddComment,
  },
  data() {
    return {
      article: {},
      comments: [],
    };
  },
  methods: {
    editArticle() {
      this.$emit('edit-article');
    },
    deleteArticle() {
      this.$emit('delete-article');
    },
    addComment(comment) {
      this.$emit('add-comment', comment);
    },
    editComment(id) {
      this.$emit('edit-comment', id);
    },
    deleteComment(id) {
      this.$emit('delete-comment', id);
    },
  },
};
</script>
