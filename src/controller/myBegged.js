/**
 * @description myBought controller
 */

const { getMyBeggeds, createMyBegged } = require("../services/myBegged");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { formatDateTime } = require("../utils/dt");

/**
 * @description 创建
 * @param {*} param0
 */
async function addMyBegged({ userId, begId }) {
  const result = await createMyBegged({
    userId,
    begId,
  });
  if (result) {
    console.log(result);
    // { errno: 0, data: {....} }
    return new SuccessModel(result);
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel("接口发生错误");
  }
}

/**
 * 获取已购列表
 * @param {string} userId 用户id
 */
async function getMyBeggedsList({ userId }) {
  const beggedsList = await getMyBeggeds({
    userId,
  });
  if (beggedsList) {
    console.log(beggedsList);
    // { errno: 0, data: {....} }
    return new SuccessModel(beggedsList);
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel("接口报错");
  }
}

module.exports = {
  addMyBegged,
  getMyBeggedsList,
};
