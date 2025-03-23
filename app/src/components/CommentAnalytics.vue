<template>
  <div>
    <v-date-picker v-model="dateFrom" label="Дата от"></v-date-picker>
    <v-date-picker v-model="dateTo" label="Дата до"></v-date-picker>
    <v-btn @click="fetchComments">Загрузить</v-btn>
    <v-list>
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title>{{ comment.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ comment.create_date }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      comments: [],
    };
  },
  methods: {
    fetchComments() {
      this.$emit('fetch', { dateFrom: this.dateFrom, dateTo: this.dateTo });
    },
  },
};
</script>
