/**
 * @description 已购买的商品 数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

const Bought = seq.define("bought", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  goodId: {
    type: INTEGER,
    allowNull: false,
    comment: '商品 id'
  },
  status: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: "商品当前的状态"
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    comment: "商品数量"
  }
});

module.exports = Bought;