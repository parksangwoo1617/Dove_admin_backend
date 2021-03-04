const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            adminId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            host: {
                type: Sequelize.STRING(255),
                allowNull: false,
                defaultValue: 'admin',
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            writer: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            event_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            link: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE(6),
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
        }, {
            sequelize,
            timestamps: false,
            tableName: "tbl_post",
            modelName: "Post",
            charset: "utf8",
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {
        db.Admin.belongsTo(db.Post, {
            foreignKey: "adminId",
            targetKey: "code",
        });
    }
};