module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        article_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        modify_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'article',
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'modify_date'
    });
    return Article;
}