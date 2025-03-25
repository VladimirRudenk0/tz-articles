<template>
  <div>
    <v-dialog v-model="showEditDialog" max-width="600">
      <ArticleForm
        :article="editingArticle"
        @submit="handleSubmit"
        @cancel="showEditDialog = false"
      />
    </v-dialog>

    <ArticleTable
      :articles="articles"
      :loading="loading"
      @view="viewArticle"
      @edit="editArticle"
      @delete="deleteArticle"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ArticleTable from '../components/ArticleTable.vue';
import ArticleForm from '../components/ArticleForm.vue';

export default {
  components: { ArticleTable, ArticleForm },
  data() {
    return {
      showEditDialog: false,
      editingArticle: null,
      loading: false
    };
  },
  computed: {
    ...mapState('articles', ['articles'])
  },
  methods: {
    ...mapActions('articles', [
      'fetchArticles',
      'deleteArticle',
      'updateArticle',
      'createArticle'
    ]),
    viewArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    editArticle(article) {
      this.editingArticle = { ...article };
      this.showEditDialog = true;
    },
    async handleSubmit(article) {
      this.loading = true;
      try {
        if (article.id) {
          await this.updateArticle({
            id: article.id,
            article: {
              name: article.name,
              article_text: article.article_text
            }
          });
        } else {
          await this.createArticle(article);
        }
        this.showEditDialog = false;
        await this.fetchArticles();
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
      } finally {
        this.loading = false;
      }
    },
    async deleteArticle(id) {
      if (confirm('Вы уверены, что хотите удалить статью?')) {
        this.loading = true;
        try {
          await this.deleteArticle(id);
          await this.fetchArticles();
        } catch (error) {
          console.error('Ошибка при удалении:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  },
  async created() {
    this.loading = true;
    try {
      await this.fetchArticles();
    } catch (error) {
      console.error('Ошибка загрузки статей:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>
