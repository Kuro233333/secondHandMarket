/**
 * @description 商品留言数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER
} = require("../types");

// GoodLeave
const GoodLeave = seq.define("goodLeave", {
  content: {
    type: STRING,
    allowNull: false,
    comment: "留言内容"
  },
  display: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 1,
    comment: "是否可见（1 是，0 否）"
  }
});

module.exports = GoodLeave;