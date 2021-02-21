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
            charset: "utf8"
        });
    }

    static associate(db) {
        db.Admin.hasMany(db.Post, {
            foreignKey: "adminId",
            sourceKey: "code",
        });
    }
};