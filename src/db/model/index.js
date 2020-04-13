/**
 * @description 数据模型入口文件
 */

const User = require("./User");
const Good = require("./Good");
const GoodLeave = require("./GoodLeave");
const Cart = require("./Cart");
const Bought = require("./Bought");
const GoodType = require("./GoodType");

Good.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Good,
  GoodLeave,
  Cart,
  Bought,
  GoodType
};