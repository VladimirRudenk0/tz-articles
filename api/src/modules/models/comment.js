module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
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
        tableName: 'comment',
        timestamps: true,
        createdAt: 'create_date',
        updatedAt: 'modify_date'
    });
    return Comment;
}