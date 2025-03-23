<template>
  <v-form @submit.prevent="submitComment">
    <v-textarea v-model="comment.text" label="Текст комментария" required></v-textarea>
    <v-btn type="submit">Добавить</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      comment: {
        text: '',
      },
    };
  },
  methods: {
    submitComment() {
      this.$emit('submit', this.comment)
    },
  },
};
</script>
