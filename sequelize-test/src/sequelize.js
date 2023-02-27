const { Sequelize, Model, DataTypes } = require("sequelize");
const { MYSQL_CONFIG } = require("./credentials");



/**
 * 描述
 * @date 2023-02-16
 * @param {string} database - 数据库名为 myblog
 * @param {string} username - 数据库用户名
 * @param {string} password - 数据库密码
 * @param {string} host - 数据库地址
 * @param {string} dialect - 数据库名称
 */
const sequelize = new Sequelize("myblog", MYSQL_CONFIG.username, MYSQL_CONFIG.password, {
  host: MYSQL_CONFIG.host,
  dialect: MYSQL_CONFIG.dialect
});

module.exports = sequelize






