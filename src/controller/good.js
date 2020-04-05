/**
 * @description good controller
 */

const {
    getGoodTypes
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
        return new ErrorModel('123')
    }


}

module.exports = {
    getGoodTypesList
}