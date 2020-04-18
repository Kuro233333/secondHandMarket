/**
 * @description good controller
 */

const {
    getGoodTypes,
    getGoods,
    deleteGood,
    createGood,
    createTypes,
    deleteType,
    getGood,
    updateGood
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
            var parent = map[item.pid]; //这里是父级ID---pid
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
 * 创建分类列表
 * @param typesArray [{name:XXX,children:[{name:xxx}]},{name:XXX,children:[{name:xxx}]}...]
 */
async function saveTypes(typesArray) {
    console.log("typesArray", typesArray)
    let params = []
    typesArray.forEach(function (item) {
        params.push({
            name: item.name,
            pid: 0
        })
    })
    typesArray.forEach(function (item, idx) {
        if (item.children) {
            item.children.forEach(function (itemChild) {
                if (itemChild.name !== "") {
                    params.push({
                        name: itemChild.name,
                        pid: idx + 1
                    })
                }
            })
        }
    })
    await deleteType()
    const goodTypeList = await createTypes(params)

    if (goodTypeList) {
        console.log(goodTypeList)
        // { errno: 0, data: {....} }
        return new SuccessModel(goodTypeList)
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
 * @param {string} sort1 商品所属一级类别
 * @param {string} sort2 商品所属二级类别
 */
async function getGoodList({
    userId,
    filter,
    pageSize,
    pageIndex,
    sort1,
    sort2,
    keyword
}) {

    const goodList = await getGoods({
        userId,
        filter,
        pageIndex,
        pageSize,
        sort1,
        sort2,
        keyword
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

/**
 * 获取我的商品列表
 * @param {number} userId 用户ID
 */
async function getMyGoodList({
    userId
}) {

    const goodList = await getGoods({
        userId,
        pageIndex: 0,
        pageSize: 1000,
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


/**
 * 获取商品详情
 * @param {number} goodId 商品Id
 */
async function getGoodDetail(goodId) {

    const good = await getGood(goodId)
    if (good) {
        console.log(good)
        // { errno: 0, data: {....} }
        return new SuccessModel(good)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('123')
    }
}


async function addGood({
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
    const goodList = await createGood({
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
    if (goodList) {
        console.log(goodList)
        // { errno: 0, data: {....} }
        return new SuccessModel(goodList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('123')
    }
}

/**
 * 删除当前商品
 * @param {string} good_id 商品ID
 */
async function deleteCurGood(good_id) {
    const result = await deleteGood(good_id)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改商品信息
 * @param {string} goodId 商品ID
 * @param {Object} {} 
 */
async function changeGoodInfo(goodId, {
    name,
    level,
    price,
    sort1,
    sort2,
    typeName,
    count,
    remark,
    image,
    hot
}) {
    console.log('control', goodId, count)

    const result = await updateGood({
        newName: name,
        newLevel: level,
        newPrice: price,
        newSort1: sort1,
        newSort2: sort2,
        newTypeName: typeName,
        newCount: count,
        newRemark: remark,
        newImage: image,
        newHot: hot
    }, {
        goodId
    })
    if (result) {
        // 执行成功
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel('接口报错')
}

module.exports = {
    getGoodTypesList,
    getGoodList,
    getMyGoodList,
    saveTypes,
    addGood,
    deleteCurGood,
    getGoodDetail,
    changeGoodInfo
}