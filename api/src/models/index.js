const Article = require('./article');
const Comment = require('./comment');

Article.hasMany(Comment, { foreignKey: 'id_article' });
Comment.belongsTo(Article, { foreignKey: 'id_article' });