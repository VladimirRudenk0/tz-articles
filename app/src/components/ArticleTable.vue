<template>
  <v-table>
    <thead>
      <tr>
        <th>Название</th>
        <th>Дата создания</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.name }}</td>
        <td>{{ article.create_date }}</td>
        <td>
          <v-btn @click="viewArticle(article.id)">Просмотр</v-btn>
          <v-btn @click="editArticle(article.id)">Редактировать</v-btn>
          <v-btn @click="deleteArticle(article.id)">Удалить</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    viewArticle(id) {
      this.$emit('view', id);
    },
    editArticle(id) {
      this.$emit('edit', id);
    },
    deleteArticle(id) {
      this.$emit('delete', id);
    },
  },
};
</script>
