/**
 * @description 求购商品留言数据模型
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER,
  BOOLEAN
} = require("../types");

// BegLeave
const BegLeave = seq.define("begLeave", {
  content: {
    type: STRING,
    allowNull: false,
    comment: "留言内容"
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '发送者 Id'
  },
  begId: {
    type: INTEGER,
    allowNull: false,
    comment: '求购商品 Id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 默认未读
    comment: '是否已读'
  }
});

module.exports = BegLeave;