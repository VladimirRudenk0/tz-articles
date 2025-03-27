const { Article } = require('../../../src/modules/models/index');

exports.createArticle = async (req, res) => {
    try {
        const { name, article_text } = req.body;
        const article = await Article.create({ 
            name, 
            article_text,
            create_date: new Date(),
            modify_date: new Date()
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllArticles = async (req, res, next) => {
    console.log('Attempting to fetch articles...');
    try {
      const articles = await Article.findAll();
      console.log('Successfully fetched articles:', articles.length);
      res.json(articles);
    } catch (error) {
      console.error('Error in getAllArticles:', {
        message: error.message,
        stack: error.stack
      });
      next(error);
    }
  };

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ error: 'Статья не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { name, article_text } = req.body;
        const [updated] = await Article.update(
            { name, article_text, modify_date: new Date() },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedArticle = await Article.findByPK(req.params.id);
            res.status(200).json(updatedArticle);
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteArticle =async(req, res) => {
    try {
        const deleted = await Article.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Статья не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};