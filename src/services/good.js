/**
 * @description good service
 */

const {
    GoodType,
    Good
} = require('../db/model/index')
const {
    formatUser
} = require('./_format')

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
 * 获取商品信息
 * @param {string} filter new or hot 最新最热排序
 * @param {number} page_size 每页多少条
 * @param {number} page 第几页
 * @param {string} type 商品所属类别
 */
async function getGoods({
    filter,
    type,
    pageIndex = 0,
    pageSize = 10
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
            ['id', 'desc']
        ]
    }

    const whereOpt = type ? {
        sort: type
    } : {}
    // 执行查询
    const result = await Good.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order,
        where: whereOpt
    })
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组

    // 获取 dataValues
    let goodList = result.rows.map(row => row.dataValues)

    return {
        count: result.count,
        goodList
    }
}

/**
 * 创建商品
 * @param {Object} param0 创建商品的数据 { userId, content, image }
 */
async function createGood({
    name,
    level,
    price,
    sort,
    count,
    remark,
    image
}) {
    const result = await Good.create({
        name,
        level,
        price,
        sort,
        count,
        remark,
        image
    })
    return result.dataValues
}

module.exports = {
    getGoodTypes,
    getGoods,
    createGood,
    createTypes,
    deleteType
}