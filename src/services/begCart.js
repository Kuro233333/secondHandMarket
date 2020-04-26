/**
 * @description begCart service
 */

const { BegCart, Beg, User } = require("../db/model/index");

/**
 * 加入购物车
 */
async function createBegCart({ userId, begId }) {
  const result = await BegCart.create({
    userId,
    begId,
  });
  return result;
}

/**
 * 获取购物车列表
 * @param {number} userId 用户id
 */
async function getBegCarts({ userId }) {
  // 查询条件
  let whereOpt = {};
  if (userId) {
    whereOpt["userId"] = userId;
  }
  // 执行查询
  const resultList = await BegCart.findAll({
    order: [["createdAt", "desc"]],
    where: whereOpt,
    include: [
      {
        model: Beg,
      },
      {
        model: User,
      },
    ],
  });

  let begCartList = resultList.map((item) => item.dataValues);

  begCartList = begCartList.map((item) => {
    item.beg = item.beg.dataValues;
    item.user = item.user.dataValues;
    return item;
  });

  return begCartList;
}

/**
 * 删除购物车
 * @param {string} begCartId 商品ID
 */
async function deleteBegCart(begCartId) {
  const result = await BegCart.destroy({
    where: {
      id: begCartId,
    },
  });
  // result 删除的行数
  return result > 0;
}

module.exports = {
  createBegCart,
  getBegCarts,
  deleteBegCart,
};
