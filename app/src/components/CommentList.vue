<template>
  <v-list>
    <v-list-item v-for="comment in comments" :key="comment.id">
      <v-list-item-content>
        <v-list-item-title>{{ comment.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ comment.create_date }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="editComment(comment.id)">Редактировать</v-btn>
        <v-btn @click="deleteComment(comment.id)">Удалить</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editComment(id) {
      this.$emit('edit', id);
    },
    deleteComment(id) {
      this.$emit('delete', id)
    },
  },
};
</script>
