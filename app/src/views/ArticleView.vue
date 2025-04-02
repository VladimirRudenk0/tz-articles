<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-card>
            <v-card-title>{{ article.name }}</v-card-title>
            <v-card-text>
              <p class="article-text">{{ article.article_text }}</p>

              <v-divider class="my-4"></v-divider>

              <div class="d-flex justify-space-between">
                <v-btn color="primary" @click="editArticle">Редактировать</v-btn>
                <v-btn color="error" @click="deleteArticle">Удалить</v-btn>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-title>Комментарии</v-card-title>
            <v-card-text>
              <CommentList
                :comments="comments"
                @delete="handleDeleteComment"
                @update="handleUpdateComment"
              />

              <AddComment @submit="handleAddComment" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CommentList from '../components/CommentList.vue'
import AddComment from '../components/AddComment.vue'

export default {
  components: { CommentList, AddComment },
  props: ['id'],
  data() {
    return {
      article: {},
      comments: []
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    ...mapActions('article', ['getArticleById', 'deleteArticle']),
    ...mapActions('comment', [
      'getCommentsForArticle',
      'createComment',
      'updateComment',
      'deleteComment'
    ]),

    async fetchData() {
      this.article = await this.getArticleById(this.id)
      this.comments = await this.getCommentsForArticle(this.id)
    },

    editArticle() {
      this.$router.push(`/articles/${this.id}/edit`)
    },

    async handleAddComment(comment) {
      await this.createComment({
        articleId: this.id,
        comment: {
          text: comment.text,
          id_article: this.id
        }
      })
      await this.fetchData()
    },

    async handleUpdateComment(comment) {
      await this.updateComment({
        id: comment.id,
        data: {
          text: comment.text,
          modify_date: new Date().toISOString()
        }
      })
      await this.fetchData()
    },

    async handleDeleteComment(id) {
      await this.deleteComment(id)
      await this.fetchData()
    },

    async deleteArticle() {
      if (confirm('Удалить статью?')) {
        await this.$store.dispatch('article/removeArticle', this.id)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.article-text {
  white-space: pre-line;
  line-height: 1.6;
}
</style>
