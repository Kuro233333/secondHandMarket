/**
 * @description good service
 */

const {
    GoodType
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
        attributes: ['id', 'parentId', 'level', 'name']
    })
    if (resultList == null) {
        // 未找到
        return resultList
    }

    return resultList.map(item => (item.dataValues))
}

module.exports = {
    getGoodTypes
}