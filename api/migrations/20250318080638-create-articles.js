module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('t_z_articles', {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
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
              allowNull: false
          },
          modify_date: {
              type: Sequelize.DATE,
              allowNull: false
          }
      });
  },
  down: async (queryInterface) => {
      await queryInterface.dropTable('t_z_articles');
  }
};