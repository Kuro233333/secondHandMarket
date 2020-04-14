/**
 * @description good service
 */

const {
    GoodType,
    Good,
    User
} = require('../db/model/index')
const {
    formatUser
} = require('./_format')
var Sequelize = require('sequelize')
var Op = Sequelize.Op

/**
 * 获取商品分类
 */
async function getGoodTypes() {
    // 查询
    const resultList = await GoodType.findAll({
        attributes: ['id', 'pid', 'name']
    })
    if (resultList == null) {
        // 未找到
        return resultList
    }

    return resultList.map(item => (item.dataValues))
}

/**
 * 创建商品分类
 */
async function createTypes(typeArr) {
    const result = await GoodType.bulkCreate(typeArr)
    return result
}

/**
 * 删除商品分类
 */
async function deleteType() {
    const result = await GoodType.destroy({
        truncate: true,
        limit: 100
    })
    const data = result.dataValues

    return data
}

/**
 * 获取商品列表信息
 * @param {number} userId 用户id
 * @param {string} filter new or hot 最新最热排序
 * @param {number} page_size 每页多少条
 * @param {number} page 第几页
 * @param {string} sort1 商品所属一级类别
 * @param {string} sort2 商品所属二级类别
 */
async function getGoods({
    userId,
    filter,
    sort1,
    sort2,
    pageIndex = 0,
    pageSize = 5,
    keyword
}) {
    // 查询条件
    let order = [
        ['hot', 'desc']
    ]
    if (filter === 'new') {
        order = [
            ['createdAt', 'desc']
        ]
    }
    if (filter === 'hot') {
        order = [
            ['hot', 'desc']
        ]
    }

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
    if (keyword) {
        whereOpt['name'] = {
            [Op.like]: '%' + keyword + '%'
        }
    }
    console.log(pageSize, pageIndex)
    // 执行查询
    const result = await Good.findAndCountAll({
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
    let goodList = result.rows.map(row => row.dataValues)
    goodList = goodList.map(goodItem => {
        goodItem.user = goodItem.user.dataValues
        console.log(goodItem.user.phone)
        return goodItem
    })
    return {
        count: result.count,
        goodList
    }
}

/**
 * 获取商品详细信息
 * @param {string} goodId 商品ID
 */
async function getGood(goodId) {
    // 查询条件
    const whereOpt = {
        id: goodId
    }

    // 查询
    const result = await Good.findOne({
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }


    return result.dataValues
}

/**
 * 创建商品
 * @param {Object} param0 创建商品的数据 { name,level,price,sort,count,remark,image }
 */
async function createGood({
    userId,
    name,
    level,
    price,
    sort1,
    sort2,
    typeName,
    count,
    remark,
    image
}) {
    const result = await Good.create({
        userId,
        name,
        level,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        image
    })
    return result.dataValues
}

/**
 * 删除商品
 * @param {string} good_id 商品ID
 */
async function deleteGood(good_id) {
    const result = await Good.destroy({
        where: {
            id: good_id
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
async function updateGood({
    newName,
    newLevel,
    newPrice,
    newSort1,
    newSort2,
    newTypeName,
    newCount,
    newRemark,
    newImage
}, {
    goodId
}) {
    // 拼接修改内容
    const updateData = {}
    if (newName) {
        updateData.name = newName
    }
    if (newLevel) {
        updateData.level = newLevel
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
    if (newCount) {
        updateData.count = newCount
    }
    if (newRemark) {
        updateData.remark = newRemark
    }
    if (newImage) {
        updateData.image = newImage
    }

    // 拼接查询条件
    const whereData = {
        id: goodId
    }
    // 执行修改
    const result = await Good.update(updateData, {
        where: whereData
    })
    console.log(result)
    return result[0] > 0 // 修改的行数
}

module.exports = {
    getGoodTypes,
    getGoods,
    createGood,
    deleteGood,
    createTypes,
    deleteType,
    getGood,
    updateGood
}