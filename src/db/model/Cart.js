/**
 * @description 购物车数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

const Cart = seq.define("cart", {
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
  display: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 0,
    comment: "商品是否被删除"
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    comment: "商品数量"
  }
});

module.exports = Cart;