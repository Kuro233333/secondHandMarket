/**
 * @description 接单栏数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

const BegCart = seq.define("begcart", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  begId: {
    type: INTEGER,
    allowNull: false,
    comment: '求购商品 id'
  }
});

module.exports = BegCart;