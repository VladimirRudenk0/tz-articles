const { Article, Comment } = require('../models/index');

exports.createArticle = async (req, res) => {
  try {
    const { name, article_text } = req.body;
    
    if (!name || !article_text) {
      return res.status(400).json({ 
        error: 'Name and article_text are required' 
      });
    }

    const article = await Article.create({ 
      name, 
      article_text,
      create_date: new Date(),
      modify_date: new Date()
    });
    
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
      const articles = await Article.findAll({
          include: [{
              model: Comment,
              as: 'comments'
          }],
          order: [['create_date', 'DESC']]
      });
      res.json(articles);
  } catch (error) {
      console.error('DB Error:', error);
      res.status(500).json({ error: error.message });
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
        { 
          name, 
          article_text,
          modify_date: new Date() 
        },
        { 
          where: { id: req.params.id } 
        }
      );
      
      if (updated) {
        const updatedArticle = await Article.findByPk(req.params.id);
        res.json(updatedArticle);
      } else {
        res.status(404).json({ error: 'Статья не найдена' });
      }
    } catch (error) {
      console.error('Ошибка обновления:', error);
      res.status(500).json({ 
        error: 'Ошибка сервера',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  };

  exports.deleteArticle = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        await Comment.destroy({ where: { id_article: req.params.id } }, { transaction });

        const deleted = await Article.destroy({ where: { id: req.params.id } }, { transaction });

        if (deleted) {
            await transaction.commit();
            res.status(204).send();
        } else {
            await transaction.rollback();
            res.status(404).json({ error: 'Статья не найдена' });
        }
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};