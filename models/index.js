const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

const Post = require("./post");
const Admin = require("./admin");

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = Post;
db.Admin = Admin;

Post.init(sequelize, Sequelize);
Admin.init(sequelize, Sequelize);

Admin.associate(db);
Post.associate(db);

module.exports = db;