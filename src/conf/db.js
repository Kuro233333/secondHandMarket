/**
 * @description 存储配置
 */

const { isProd } = require("../utils/env");

let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "secondhand_market"
};

if (isProd) {
  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: "localhost",
    user: "root",
    password: "Mysql_2018",
    port: "3306",
    database: "koa2_weibo_db"
  };
}

module.exports = {
  MYSQL_CONF
};
