module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('comment', {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          text: {
              type: Sequelize.TEXT,
              allowNull: false
          },
          id_article: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                  model: 'article',
                  key: 'id'
              }
          },
          create_date: {
              type: Sequelize.DATE,
              allowNull: false
          },
          modify_date: {
              type: Sequelize.DATE,
              allowNull: false
          }
      });
  },
  down: async (queryInterface) => {
      await queryInterface.dropTable('comment');
  }
};