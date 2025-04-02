const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../../../.env') });

console.log('Database config:', {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE
});

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    logging: console.log
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connection established'))
  .catch(err => console.error('Connection error:', err));

const Article = require('./article')(sequelize, Sequelize);
const Comment = require('./comment')(sequelize, Sequelize);

Article.hasMany(Comment, {
  foreignKey: 'id_article',
  as: 'comments',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Article, {
  foreignKey: 'id_article',
  as: 'article'
});


module.exports = {
  sequelize,
  Article,
  Comment
};