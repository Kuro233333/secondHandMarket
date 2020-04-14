/**
 * @description 我发布的商品 数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

const MyGood = seq.define("mygood", {
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
  quantity: {
    type: INTEGER,
    allowNull: false,
    comment: "商品数量"
  }
});

module.exports = MyGood;