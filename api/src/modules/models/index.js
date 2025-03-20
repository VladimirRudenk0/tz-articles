const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
  }
);

const Article = require('./article')(sequelize, Sequelize);
const Comment = require('./comment')(sequelize, Sequelize);

Article.hasMany(Comment, { foreignKey: 'id_article' });
Comment.belongsTo(Article, { foreignKey: 'id_article' });

module.exports = {
  sequelize,
  Article,
  Comment,
};