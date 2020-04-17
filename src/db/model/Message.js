/**
 * @description 用户消息列表
 */

const seq = require("../seq");
const {
  STRING,
  DECIMAL,
  INTEGER,
  BOOLEAN
} = require("../types");

// Message
const Message = seq.define("Message", {
  content: {
    type: STRING,
    allowNull: false,
    comment: "内容"
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
  receivedId: {
    type: INTEGER,
    allowNull: false,
    comment: '接收者 Id'
  },
  receivedName: {
    type: STRING,
    allowNull: false,
    comment: "接收者名字"
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 默认未读
    comment: '是否已读'
  }
});

module.exports = Message;