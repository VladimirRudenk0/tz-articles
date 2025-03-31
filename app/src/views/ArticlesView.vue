<template>
  <div>
    <v-dialog v-model="showEditDialog" max-width="600">
      <article-form :article="editingArticle" @submit="handleSubmit" @cansel="showEditDialog = false" />
    </v-dialog>

    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-card v-for="article in articles" :key="article.id" class="mb-6 article-card" elevation="2">
            <v-card-title class="d-flex justify-space-between align-center">
              <span>{{ article.name }}</span>
              <div>
                <v-btn icon @click="editArticle(article)" color="primary">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteArticle(article.id)" color="error" class="ml-2">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-title>

            <v-card-text>
              <p class="article-text">{{ article.article_text }}</p>
              <v-divider class="my-4"></v-divider>

              <div class="comments-section">
                <h4 class="mb-4">Комментарии</h4>
                <div v-if="getArticleComments(article.id).length > 0">
                  <div v-for="comment in getArticleComments(article.id)"
                    :key="comment.id"
                    class="comment-item">
                    <div class="comment-header">
                      <v-chip small color="grey lighten-3">
                      {{ formatDate(comment.create_date) }}
                      </v-chip>
                    </div>
                    <p class="comment-text">{{ comment.text }}</p>
                  </div>
                </div>
              <div v-else class="no-comments">
                Пока нет комментариев
              </div>
             </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ArticleForm from '../components/ArticleForm.vue';

export default {
  components: { ArticleForm },
  data() {
    return {
      showEditDialog: false,
      editingArticle: null,
      localLoading: false
    };
  },
  computed: {
    ...mapState('article', ['articles']),
    ...mapState('comment', ['commentsByArticle', 'loading', 'error']),

    getArticleComments() {
      return (articleId) => {
        return this.commentsByArticle[articleId] || [];
      };
    }
  },
  methods: {
    ...mapActions('article', [
      'getAllArticles',
      'removeArticle',
      'modifyArticle',
      'addArticle'
    ]),
    ...mapActions('comment', ['getCommentsForArticle']),

    formatDate(date) {
      return new Date(date).toLocaleString('ru-RU');
    },

    editArticle(article) {
      this.editingArticle = { ...article };
      this.showEditDialog = true;
    },

    async handleSubmit(articleData) {
    this.localLoading = true;
    try {
      if (articleData.id) {
        await this.modifyArticle({
          id: articleData.id,
          data: {
            name: articleData.name,
            article_text: articleData.article_text,
            modify_date: articleData.modify_date
          }
        });
      } else {
        await this.addArticle({
          name: articleData.name,
          article_text: articleData.article_text,
          modify_date: articleData.modify_date
        });
      }
      this.showEditDialog = false;
      await this.getAllArticles();
    } catch (error) {
      let errorMessage = 'Ошибка сохранения';
      if (error.response?.data?.error?.includes('notNull Violation')) {
        errorMessage = 'Заполните все обязательные поля';
      }
      this.$store.dispatch('showSnackbar', {
        text: errorMessage,
        color: 'error'
      });
    } finally {
      this.localLoading = false;
    }
  },

    async deleteArticle(id) {
      if (confirm('Удалить статью?')) {
        this.localLoading = true;
        try {
          await this.removeArticle(id);
          await this.getAllArticles();
        } catch (error) {
          console.error('Ошибка удаления:', error);
        } finally {
          this.localLoading = false;
        }
      }
    }
  },
  async created() {
    this.localLoading = true;
    try {
      await this.getAllArticles();

      if (this.articles.length > 0) {
        await Promise.all(
          this.articles.map(article =>
            this.getCommentsForArticle(article.id)
          )
        );
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      this.localLoading = false;
    }
  }
};
</script>

<style scoped>
.article-card {
  transition: all 0.3s ease;
  margin-top: 1em;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.article-text {
  white-space: pre-line;
  line-height: 1.6;
}

.comments-section {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.comment-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.comment-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.comment-header {
  margin-bottom: 8px;
}

.comment-text {
  margin: 0;
  padding-left: 10px;
  color: #333;
}

.no-comments {
  color: #999;
  font-style: italic;
  padding: 10px 0;
}
</style>
