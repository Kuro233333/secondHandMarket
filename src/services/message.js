/**
 * @description Message service
 */

const { Message } = require("../db/model/index");

/**
 * 创建消息
 */
async function createMessage({
  content,
  userId,
  userName,
  receivedId,
  receivedName,
}) {
  const result = await Message.create({
    content,
    userId,
    userName,
    receivedName,
    receivedId,
    isRead: false,
  });
  return result;
}

/**
 * 获取消息列表
 * @param {number} userId 用户id
 */
async function getMessage({ userId, isRead }) {
  // 查询条件
  let whereOpt = {};
  if (userId) {
    whereOpt["receivedId"] = userId;
  }
  if (isRead) {
    whereOpt["isRead"] = false;
  }
  // 执行查询
  const resultList = await Message.findAll({
    order: [["createdAt", "desc"]],
    where: whereOpt,
  });

  return resultList.map((item) => item.dataValues);
}

/**
 * 更新
 */
async function updateMessage({ newIsRead }, { msgId }) {
  // 拼接修改内容
  const updateData = {};
  if (newIsRead) {
    updateData.isRead = true;
  }

  // 拼接查询条件
  const whereData = {
    id: msgId,
  };
  // 执行修改
  const result = await Message.update(updateData, {
    where: whereData,
  });
  console.log(result);
  return result[0] > 0; // 修改的行数
}

module.exports = {
  createMessage,
  getMessage,
  updateMessage,
};
