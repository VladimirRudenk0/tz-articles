<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="article.name" label="Название статьи" required></v-text-field>
    <v-textarea v-model="article.article_text" label="Текст статьи" required></v-textarea>
    <v-btn type="submit">Сохранить</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        name: '',
        article_text: '',
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.article);
    },
  },
};
</script>
