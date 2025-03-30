module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        id_article: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'article',
                key: 'id'
            }
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
        schema: 'tz_articles',
        tableName: 'comment',
        timestamps: false,
        createdAt: 'create_date',
        updatedAt: 'modify_date'
    });
    return Comment;
}