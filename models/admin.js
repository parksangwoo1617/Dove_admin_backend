const Sequelize = require('sequelize');

module.exports = class Admin extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            code: {
                type: Sequelize.STRING(10),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: "admin",
            modelName: "Admin",
            paranoid: false,
            charset: "utf8",
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Post.hasMany(db.Admin, {
            foreignKey: "adminId",
            sourceKey: "code",
        });
    }
};