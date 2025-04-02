module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('article', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        article_text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        create_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        modify_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, {
        schema: 'tz_articles'
      });
  
      await queryInterface.sequelize.query(`
        CREATE SEQUENCE tz_articles.article_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1
        OWNED BY tz_articles.article.id;
      `);
  
      await queryInterface.sequelize.query(`
        ALTER TABLE tz_articles.article 
        ALTER COLUMN id SET DEFAULT nextval('tz_articles.article_id_seq'::regclass);
      `);
    },
  
    down: async (queryInterface) => {
      await queryInterface.sequelize.query(`
        DROP SEQUENCE IF EXISTS tz_articles.article_id_seq;
      `);
      
      await queryInterface.dropTable('article');
    }
};