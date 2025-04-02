<template>
  <v-form @submit.prevent="submitComment" class="add-comment-form">
    <v-textarea
      v-model="text"
      label="Добавить комментарий"
      rows="2"
      :rules="[v => !!v || 'Комментарий не может быть пустым']"
      required
    ></v-textarea>
    <v-btn
      type="submit"
      color="primary"
      :disabled="!text"
    >
      Отправить
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    submitComment() {
      this.$emit('submit', {
        articleId: this.articleId,
        text: this.text
      });
      this.text = '';
    }
  }
}
</script>

<style scoped>
.add-comment-form {
  margin-top: 16px;
}
</style>
