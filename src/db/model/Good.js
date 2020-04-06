/**
 * @description 商品数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

// goods
const Good = seq.define("good", {
  name: {
    type: STRING,
    allowNull: false,
    comment: "商品名称"
  },
  level: {
    type: STRING,
    allowNull: false,
    comment: "商品成色"
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    comment: "商品价格"
  },
  sort: {
    type: STRING,
    allowNull: false,
    comment: "商品类别"
  },
  count: {
    type: INTEGER,
    allowNull: false,
    comment: "商品数量"
  },
  display: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 1,
    comment: "商品是否下架（1 存在，0 下架）"
  },
  way: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 1,
    comment: "交易方式( 1?2?）"
  },
  sales: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "商品销量"
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
  hot: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品热度"
  }
});

module.exports = Good;