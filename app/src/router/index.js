import { createRouter, createWebHistory } from 'vue-router';
import ArticlesView from '../views/ArticlesView.vue';
import ArticleView from '../views/ArticleView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';

const routes = [
  {
    path: '/',
    name: 'articles',
    component: ArticlesView
  },
  {
    path: '/article/:id',
    name: 'article',
    component: ArticleView,
    props: true
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: AnalyticsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
