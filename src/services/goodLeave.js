/**
 * @description goodLeave service
 */

const {
    GoodLeave
} = require('../db/model/index')


/**
 * 创建商品留言
 */
async function createGoodLeave({
    content,
    userId,
    userName,
    goodId
}) {
    const result = await GoodLeave.create({
        content,
        userId,
        userName,
        goodId,
        isRead: false

    })
    return result
}



module.exports = {
    createGoodLeave
}