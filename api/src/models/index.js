const article = require('./article');
const comment = require('./comment');

article.hasMany(comment, { foreignKey: 'id_article' });
comment.belongsTo(article, { foreignKey: 'id_article' });