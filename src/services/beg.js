/**
 * @description beg service
 */

const {
    Beg,
    User
} = require('../db/model/index')
const {
    formatUser
} = require('./_format')
var Sequelize = require('sequelize')
var Op = Sequelize.Op


/**
 * 获取商品列表信息
 * @param {number} userId 用户id
 * @param {number} page_size 每页多少条
 * @param {number} page 第几页
 * @param {string} sort1 商品所属一级类别
 * @param {string} sort2 商品所属二级类别
 */
async function getBegs({
    userId,
    sort1,
    sort2,
    pageIndex = 0,
    pageSize = 5
}) {
    // 查询条件
    let order = [
        ['createdAt', 'desc']
    ]

    let whereOpt = {}
    if (sort1) {
        whereOpt['sort1'] = sort1
    }
    if (sort2) {
        whereOpt['sort2'] = sort2
    }
    if (userId) {
        whereOpt['userId'] = userId
    }
    console.log(whereOpt)
    // 执行查询
    const result = await Beg.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order,
        where: whereOpt,
        include: [{
            model: User,
            attributes: ['userName', 'phone']
        }]
    })
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组
    // 获取 dataValues
    let begList = result.rows.map(row => row.dataValues)

    begList = begList.map(begItem => {
        begItem.user = begItem.user.dataValues
        return begItem
    })
    return {
        count: result.count,
        begList
    }
}


/**
 * 创建求购商品
 * @param {Object} param0 创建求购商品的数据 { name,level,price,sort,count,remark,image }
 */
async function createBeg({
    userId,
    name,
    price,
    sort1,
    sort2,
    typeName,
    count,
    remark
}) {
    const result = await Beg.create({
        userId,
        name,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark
    })
    return result.dataValues
}

/**
 * 删除求购商品
 * @param {string} beg_id 求购商品ID
 */
async function deleteBeg(beg_id) {
    const result = await Beg.destroy({
        where: {
            id: beg_id
        }
    })
    // result 删除的行数
    return result > 0
}

/**
 * 更新商品信息
 * @param {Object} param0 要修改的内容 { .... }
 * @param {Object} param1 查询条件 { good_id }
 */
async function updateBeg({
    newName,
    newPrice,
    newSort1,
    newSort2,
    newTypeName,
    newCount,
    newRemark
}, {
    begId
}) {
    // 拼接修改内容
    const updateData = {}
    if (newName) {
        updateData.name = newName
    }
    if (newSort1) {
        updateData.sort1 = newSort1
    }
    if (newSort2) {
        updateData.sort2 = newSort2
    }
    if (newPrice) {
        updateData.price = newPrice
    }
    if (newTypeName) {
        updateData.typeName = newTypeName
    }
    if (newCount === 0 || newCount) {
        updateData.count = newCount
    }
    if (newRemark) {
        updateData.remark = newRemark
    }

    // 拼接查询条件
    const whereData = {
        id: begId
    }
    // 执行修改
    const result = await Beg.update(updateData, {
        where: whereData
    })
    console.log(result)
    return result[0] > 0 // 修改的行数
}

/**
 * 获取商品详细信息
 * @param {string} begId 商品ID
 */
async function getBeg(begId) {
    // 查询条件
    const whereOpt = {
        id: begId
    }

    // 查询
    const result = await Beg.findOne({
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    return result.dataValues
}

module.exports = {
    getBegs,
    deleteBeg,
    createBeg,
    updateBeg,
    getBeg
}