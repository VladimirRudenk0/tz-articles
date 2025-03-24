import { createRouter, createWebHistory } from 'vue-router';
import ArticleTable from '../components/ArticleTable.vue';
import ArticleView from '../components/ArticleView.vue';
import CommentAnalytics from '../components/CommentAnalytics.vue';

const routes = [
  {
    path: '/',
    component: ArticleTable,
  },
  {
    path: '/article/:id',
    component: ArticleView,
    props: true,
  },
  {
    path: '/analytics',
    component: CommentAnalytics,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
