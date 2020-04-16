/**
 * @description 商品留言数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER,
  BOOLEAN
} = require("../types");

// GoodLeave
const GoodLeave = seq.define("goodLeave", {
  content: {
    type: STRING,
    allowNull: false,
    comment: "留言内容"
  },
  userName: {
    type: STRING,
    allowNull: false,
    comment: "发送者名字"
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '发送者 Id'
  },
  goodId: {
    type: INTEGER,
    allowNull: false,
    comment: '商品 Id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 默认未读
    comment: '是否已读'
  }
});

module.exports = GoodLeave;