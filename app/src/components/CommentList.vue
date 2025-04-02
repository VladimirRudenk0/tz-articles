<template>
  <div class="comment-section">
    <h3>Комментарии</h3>

    <div v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-content">
          <p>{{ comment.text }}</p>
          <small>{{ formatDate(comment.create_date) }}</small>
        </div>
        <div class="comment-actions">
          <v-btn icon @click="editComment(comment)" color="primary" size="small">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteComment(comment.id)" color="error" size="small">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <p v-else class="no-comments">Пока нет комментариев</p>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('ru-RU')
    },
    editComment(comment) {
      this.$emit('edit', comment)
    },
    deleteComment(id) {
      if (confirm('Удалить комментарий?')) {
        this.$emit('delete', id)
      }
    }
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.comment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-content {
  flex-grow: 1;
}

.comment-actions {
  display: flex;
  gap: 8px;
}

.no-comments {
  color: #757575;
  font-style: italic;
}
</style>
