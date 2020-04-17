/**
 * @description goodLeave controller
 */

const {
    createGoodLeave
} = require('../services/goodLeave')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')


async function addGoodLeave({
    content,
    userId,
    goodId,
    userName
}) {
    const goodLeaveList = await createGoodLeave({
        content,
        userId,
        goodId,
        userName
    })
    if (goodLeaveList) {
        console.log(goodLeaveList)
        // { errno: 0, data: {....} }
        return new SuccessModel(goodLeaveList)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel('接口发生错误')
    }
}


module.exports = {
    addGoodLeave
}