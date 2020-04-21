/**
 * @description myBegged service
 */

const {
    MyBegged,
    Beg
} = require('../db/model/index')


/**
 * 创建
 */
async function createMyBegged({
    userId,
    begId
}) {
    const result = await MyBegged.create({
        userId,
        begId
    })
    return result
}

/**
 * 获取已购列表
 * @param {number} userId 用户id
 */
async function getMyBeggeds({
    userId
}) {
    // 查询条件
    let whereOpt = {}
    if (userId) {
        whereOpt['userId'] = userId
    }
    // 执行查询
    const resultList = await MyBegged.findAll({
        order: [
            ['createdAt', 'desc']
        ],
        where: whereOpt,
        include: [{
            model: Beg
        }]

    })

    let beggedList = resultList.map(item => (item.dataValues))
    beggedList = beggedList.map(item => {
        item.beg = item.beg.dataValues
        return item
    })

    return beggedList
}


module.exports = {
    getMyBeggeds,
    createMyBegged
}