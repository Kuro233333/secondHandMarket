/**
 * @description 数据模型入口文件
 */

const User = require("./User");
const Good = require("./Good");
const GoodLeave = require("./GoodLeave");
const Beg = require("./Beg");
const BegLeave = require("./BegLeave");
const Cart = require("./Cart");
const GoodType = require("./GoodType");
const MyBought = require("./MyBought");
const MyBeg = require("./MyBeg");
const MyGood = require("./MyGood");

Good.belongsTo(User, {
  foreignKey: 'userId'
})

GoodLeave.belongsTo(Good, {
  foreignKey: 'goodId'
})

GoodLeave.belongsTo(User, {
  foreignKey: 'userId'
})

BegLeave.belongsTo(Beg, {
  foreignKey: 'begId'
})

BegLeave.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Good, {
  foreignKey: 'userId'
})

User.hasMany(Beg, {
  foreignKey: 'userId'
})

Good.hasMany(GoodLeave, {
  foreignKey: 'goodId'
})


module.exports = {
  User,
  Good,
  GoodLeave,
  Cart,
  GoodType,
  Beg,
  BegLeave,
  MyBought,
  MyBeg,
  MyGood
};