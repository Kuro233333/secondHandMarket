/**
 * @description message controller
 */

const {
    createCart,
    getCarts,
    deleteCart,
    getCart,
    updateCart
} = require('../services/cart')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    formatDateTime
} = require('../utils/dt')
/**
 * @description 新增加入购物车
 * @param {*} param0 
 */
async function addCart({
    userId,
    goodId
}) {
    const result = await createCart({
        userId,
        goodId
    })
    if (result) {
        console.log(result)
        // { errno: 0, data: {....} }
        return new SuccessModel(result)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口发生错误')
    }
}

/**
 * 获取购物车列表
 * @param {string} userId 用户id
 */
async function getCartList({
    userId,
}) {

    const cartList = await getCarts({
        userId,
    })
    if (cartList) {
        console.log(cartList)
        const list = cartList.map(item => {
            return item
        })
        // { errno: 0, data: {....} }
        return new SuccessModel(list)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口报错')
    }

}

/**
 * 查询购物车是否存在
 * @param {string} userId 用户id
 */
async function isCartExit({
    goodId,
    userId
}) {

    const cartList = await getCart({
        goodId,
        userId
    })
    console.log(cartList)
    if (cartList) {
        console.log(cartList.length)
        // { errno: 0, data: {....} }
        return new SuccessModel(cartList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口报错')
    }

}

/**
 * 删除当前购物车
 * @param {string} cartId 购物车ID
 */
async function deleteCurCart(cartId) {
    const result = await deleteCart(cartId)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel('接口失败')
}

/**
 * 修改购物车信息
 * @param {string} cartId 购物车ID
 * @param {Object} {} 
 */
async function changeCartInfo(cartId, {
    quantity
}) {


    const result = await updateCart({
        newQuantity: quantity
    }, {
        cartId
    })
    if (result) {
        // 执行成功
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
    addCart,
    getCartList,
    deleteCurCart,
    isCartExit,
    changeCartInfo
}