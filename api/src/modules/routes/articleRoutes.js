const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article-controller');

router.get('/', articleController.getAllArticles);
router.post('/', articleController.createArticle);
router.get('/:id', articleController.getArticleById);
router.patch('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;