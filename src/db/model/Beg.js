/**
 * @description 求购商品数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
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
  image: {
    type: STRING,
    allowNull: true,
    comment: "商品的图片地址"
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  }
});

module.exports = Beg;