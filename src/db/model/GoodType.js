/**
 * @description 商品分类
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

// GoodType
const GoodType = seq.define("GoodType", {
  parentId: {
    type: STRING,
    allowNull: false,
    comment: "父ID"
  },
  level: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 1,
    comment: "分类层级"
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: "分类名字"
  }
});



module.exports = GoodType;