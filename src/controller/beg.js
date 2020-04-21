/**
 * @description beg controller
 */

const {
    getBegs,
    createBeg,
    deleteBeg,
    updateBeg,
    getBeg
} = require('../services/beg')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')

/**
 * 获取求购商品列表
 * @param {number} pageSize 每页多少条
 * @param {number} pageIndex 第几页
 * @param {string} sort1 商品所属一级类别
 * @param {string} sort2 商品所属二级类别
 */
async function getBegList({
    userId,
    pageSize,
    pageIndex,
    sort1,
    sort2,
    keyword
}) {
    console.log(sort2, pageIndex)
    const begList = await getBegs({
        userId,
        pageIndex,
        pageSize,
        sort1,
        sort2,
        keyword
    })
    if (begList) {
        console.log(begList)
        // { errno: 0, data: {....} }
        return new SuccessModel(begList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口报错')
    }

}

/**
 * 获取我的求购商品列表
 * @param {number} userId 用户ID
 */
async function getMyBegList({
    userId
}) {

    const begList = await getBegs({
        userId,
        pageIndex: 0,
        pageSize: 1000,
    })
    if (begList) {
        console.log(begList)
        // { errno: 0, data: {....} }
        return new SuccessModel(begList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口报错')
    }
}

async function addBeg({
    userId,
    name,
    price,
    sort1,
    sort2,
    typeName,
    count,
    remark
}) {
    const begList = await createBeg({
        userId,
        name,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark
    })
    if (begList) {
        console.log(begList)
        // { errno: 0, data: {....} }
        return new SuccessModel(begList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('123')
    }
}

/**
 * 删除当前求购商品
 * @param {string} beg_id 商品ID
 */
async function deleteCurBeg(beg_id) {
    const result = await deleteBeg(beg_id)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改求购商品信息
 * @param {string} goodId 商品ID
 * @param {Object} {} 
 */
async function changeBegInfo(begId, {
    name,
    price,
    sort1,
    sort2,
    typeName,
    count,
    remark,
    isPick,
    isPay
}) {
    console.log("isPay", isPay)
    const result = await updateBeg({
        newName: name,
        newPrice: price,
        newSort1: sort1,
        newSort2: sort2,
        newTypeName: typeName,
        newCount: count,
        newRemark: remark,
        newIsPick: isPick,
        newIsPay: isPay
    }, {
        begId
    })
    if (result) {
        // 执行成功
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel('接口报错')
}

/**
 * 获取求购商品详情
 * @param {number} begId 商品Id
 */
async function getBegDetail(begId) {

    const beg = await getBeg(begId)
    if (beg) {
        console.log(beg)
        // { errno: 0, data: {....} }
        return new SuccessModel(beg)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口报错')
    }
}

module.exports = {
    getBegList,
    getMyBegList,
    addBeg,
    deleteCurBeg,
    changeBegInfo,
    getBegDetail
}