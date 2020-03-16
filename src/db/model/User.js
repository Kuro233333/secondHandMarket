/**
 * @description 用户数据模型
 */

const seq = require("../seq");
const { STRING, DECIMAL } = require("../types");

// users
const User = seq.define("user", {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: "用户昵称，唯一"
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: "密码"
  },
  realName: {
    type: STRING,
    allowNull: false,
    comment: "用户真实姓名"
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: "性别（1 男性，2 女性，3 保密）"
  },
  phone: {
    type: STRING,
    comment: "用户手机号码"
  },
  studentNo: {
    type: STRING,
    comment: "用户学号"
  },
  avatar: {
    type: STRING,
    comment: "头像，图片地址"
  },
  class: {
    type: STRING,
    comment: "用户所在班级"
  },
  dormitory: {
    type: STRING,
    comment: "宿舍号"
  }
});

module.exports = User;
