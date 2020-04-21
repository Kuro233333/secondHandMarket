/**
 * @description 求购商品数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  BOOLEAN,
  INTEGER
} = require("../types");

// Begs
const Beg = seq.define("beg", {
  name: {
    type: STRING,
    allowNull: false,
    comment: "求购商品名称"
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    comment: "求购商品价格"
  },
  typeName: {
    type: STRING,
    allowNull: false,
    comment: "求购商品分类"
  },
  sort1: {
    type: STRING,
    allowNull: false,
    comment: "求购商品一级类别id"
  },
  sort2: {
    type: STRING,
    allowNull: false,
    comment: "求购商品二级类别id"
  },
  count: {
    type: INTEGER,
    allowNull: false,
    comment: "求购商品数量"
  },
  remark: {
    type: STRING,
    allowNull: true,
    comment: "商品详细信息"
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  isPay: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 默认未支付
    comment: '是否支付'
  },
  isPick: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 是否接了
    comment: '是否已接单'
  }
});

module.exports = Beg;