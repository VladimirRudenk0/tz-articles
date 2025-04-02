module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            defaultValue: sequelize.Sequelize.literal("nextval('tz_articles.article_id_seq'::regclass)")
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        article_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        modify_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        schema: 'tz_articles',
        tableName: 'article',
        timestamps: false,
        createdAt: 'create_date',
        updatedAt: 'modify_date'
    });

    Article.associate = function(models) {
        Article.hasMany(models.Comment, {
            foreignKey: 'id_article',
            as: 'comments'
        });
    };

    return Article;
};