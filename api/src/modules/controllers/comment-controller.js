const { Comment } = require('../../../src/modules/models/index');

exports.createComment = async (req, res) => {
  try {
    const { text, id_article } = req.body;
    const comment = await Comment.create({ text, id_article, create_date: new Date(), modify_date: new Date() });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentsByArticleId = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { id_article: req.params.id_article } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Комментарий не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const [updated] = await Comment.update(
      { text, modify_date: new Date() },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedComment = await Comment.findByPk(req.params.id);
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ error: 'Комментарий не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Комментарий не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};