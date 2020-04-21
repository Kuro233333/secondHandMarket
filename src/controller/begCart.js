/**
 * @description message controller
 */

const {
    createBegCart,
    getBegCarts,
    deleteBegCart
} = require('../services/begCart')
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
async function addBegCart({
    userId,
    begId
}) {
    const result = await createBegCart({
        userId,
        begId
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
async function getBegCartList({
    userId,
}) {

    const begCartList = await getBegCarts({
        userId,
    })
    if (begCartList) {
        console.log(begCartList)
        const list = begCartList.map(item => {
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
 * 删除当前购物车
 * @param {string} begCartId 购物车ID
 */
async function deleteCurBegCart(begCartId) {
    const result = await deleteBegCart(begCartId)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel('接口失败')
}


module.exports = {
    addBegCart,
    getBegCartList,
    deleteCurBegCart
}