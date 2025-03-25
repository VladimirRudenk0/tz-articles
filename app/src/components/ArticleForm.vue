<template>
  <v-card>
    <v-card-title>
      {{ isEditMode ? 'Редактировать статью' : 'Создать статью' }}
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formData.name"
          label="Название"
          :rules="[v => !!v || 'Обязательное поле']"
          required
        ></v-text-field>
        <v-textarea
          v-model="formData.article_text"
          label="Текст статьи"
          :rules="[v => !!v || 'Обязательное поле']"
          required
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('cancel')">Отмена</v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="loading"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        article_text: ''
      })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        id: null,
        name: '',
        article_text: ''
      }
    };
  },
  computed: {
    isEditMode() {
      return !!this.article.id;
    }
  },
  watch: {
    article: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.formData = { ...newVal };
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData });
    }
  }
};
</script>
