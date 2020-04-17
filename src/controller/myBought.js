/**
 * @description myBought controller
 */

const {
    createMyBoughts,
    getMyBoughts
} = require('../services/myBought')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    formatDateTime
} = require('../utils/dt')
/**
 * @description 创建消息
 * @param {*} param0 
 */
async function addMyBoughts(arr) {
    const boughtsList = await createMyBoughts(arr)
    if (boughtsList) {
        console.log(boughtsList)
        // { errno: 0, data: {....} }
        return new SuccessModel(boughtsList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口发生错误')
    }
}

/**
 * 获取已购列表
 * @param {string} userId 用户id
 */
async function getMyBoughtsList({
    userId,
}) {

    const boughtsList = await getMyBoughts({
        userId,
    })
    if (boughtsList) {
        console.log(boughtsList)
        // { errno: 0, data: {....} }
        return new SuccessModel(boughtsList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口报错')
    }

}

module.exports = {
    addMyBoughts,
    getMyBoughtsList
}