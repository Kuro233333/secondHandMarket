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
  pid: {
    type: STRING,
    allowNull: false,
    comment: "父ID"
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: "分类名字"
  }
});



module.exports = GoodType;