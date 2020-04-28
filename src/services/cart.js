/**
 * @description cart service
 */

const { Cart, Good, User } = require("../db/model/index");

/**
 * 加入购物车
 */
async function createCart({ userId, goodId, ownerId, ownerName }) {
  const result = await Cart.create({
    userId,
    goodId,
    ownerId,
    ownerName,
    quantity: 1,
  });
  return result;
}

/**
 * 获取购物车列表
 * @param {number} userId 用户id
 */
async function getCarts({ userId }) {
  // 查询条件
  let whereOpt = {};
  if (userId) {
    whereOpt["userId"] = userId;
  }
  // 执行查询
  const resultList = await Cart.findAll({
    order: [["createdAt", "desc"]],
    where: whereOpt,
    include: [
      {
        model: Good,
      },
    ],
  });

  let cartList = resultList.map((item) => item.dataValues);
  console.log(cartList);
  cartList = cartList.map((item) => {
    item.good = item.good.dataValues;
    return item;
  });

  return cartList;
}

/**
 * 删除购物车
 * @param {string} cartId 商品ID
 */
async function deleteCart(cartId) {
  const result = await Cart.destroy({
    where: {
      id: cartId,
    },
  });
  // result 删除的行数
  return result > 0;
}

/**
 * 获取购物车单条记录
 * @param {string} cartId 购物车ID
 */
async function getCart({ goodId, userId }) {
  // 查询条件
  const whereOpt = {
    goodId,
    userId,
  };

  // 查询
  const result = await Cart.findOne({
    where: whereOpt,
  });
  if (result == null) {
    // 未找到
    return result;
  }

  return result.dataValues;
}

/**
 * 更新购物车信息
 * @param {Object} param0 要修改的内容 { .... }
 * @param {Object} param1 查询条件 { cartId }
 */
async function updateCart({ newQuantity }, { cartId }) {
  // 拼接修改内容
  const updateData = {};
  if (newQuantity) {
    updateData.quantity = newQuantity;
  }

  // 拼接查询条件
  const whereData = {
    id: cartId,
  };
  // 执行修改
  const result = await Cart.update(updateData, {
    where: whereData,
  });
  console.log(result);
  return result[0] > 0; // 修改的行数
}

module.exports = {
  createCart,
  getCarts,
  getCart,
  deleteCart,
  updateCart,
};
