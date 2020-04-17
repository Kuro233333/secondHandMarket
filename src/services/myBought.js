/**
 * @description MyBought service
 */

const {
    MyBought,
    Good
} = require('../db/model/index')


/**
 * 创建已购
 * @param arr [{
    goodId,
    userId,
    quantity
},{
    goodId,
    userId,
    quantity
}]
 */
async function createMyBoughts(arr) {
    const result = await MyBought.bulkCreate(arr)
    console.log('createMyBought', result)
    return result
}

/**
 * 获取已购列表
 * @param {number} userId 用户id
 */
async function getMyBoughts({
    userId
}) {
    // 查询条件
    let whereOpt = {}
    if (userId) {
        whereOpt['userId'] = userId
    }
    // 执行查询
    const resultList = await MyBought.findAll({
        order: [
            ['createdAt', 'desc']
        ],
        where: whereOpt,
        include: [{
            model: Good
        }]

    })

    let boughtList = resultList.map(item => (item.dataValues))
    boughtList = boughtList.map(item => {
        item.good = item.good.dataValues
        return item
    })

    return boughtList
}


module.exports = {
    createMyBoughts,
    getMyBoughts
}