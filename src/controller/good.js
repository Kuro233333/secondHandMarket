/**
 * @description good controller
 */

const {
    getGoodTypes,
    getGoods
} = require('../services/good')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')

/**
 * 获取分类列表
 */
async function getGoodTypesList() {

    function tree(data) {
        var map = {};
        data.forEach(function (item) {
            map[item.id] = item; //这里的ID根据数据库的字段
        });
        //console.log(map)
        var val = [];
        data.forEach(function (item) {
            var parent = map[item.parentId]; //这里是父级ID---pid
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                val.push(item);
            }
        });
        return val;
    }

    const goodTypeList = await getGoodTypes()
    if (goodTypeList) {
        console.log(goodTypeList)
        // { errno: 0, data: {....} }
        return new SuccessModel(tree(goodTypeList))
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('获取分类列表失败')
    }


}

/**
 * 获取商品列表
 * @param {string} filter new or hot 最新最热排序
 * @param {number} pageSize 每页多少条
 * @param {number} pageIndex 第几页
 * @param {string} type 商品所属类别
 */
async function getGoodList({
    filter,
    pageSize,
    pageIndex,
    type
}) {

    const goodList = await getGoods({
        filter,
        pageIndex,
        pageSize,
        type
    })
    if (goodList) {
        console.log(goodList)
        // { errno: 0, data: {....} }
        return new SuccessModel(goodList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('123')
    }

}

module.exports = {
    getGoodTypesList,
    getGoodList
}