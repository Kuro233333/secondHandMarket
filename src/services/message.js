/**
 * @description Message service
 */

const {
    Message
} = require('../db/model/index')


/**
 * 创建消息
 */
async function createMessage({
    content,
    userId,
    userName,
    receivedId,
    receivedName
}) {
    const result = await Message.create({
        content,
        userId,
        userName,
        receivedName,
        receivedId,
        isRead: false

    })
    return result
}

/**
 * 获取消息列表
 * @param {number} userId 用户id
 */
async function getMessage({
    userId
}) {
    // 查询条件
    let whereOpt = {}
    if (userId) {
        whereOpt['receivedId'] = userId
    }
    // 执行查询
    const resultList = await Message.findAll({
        order: [
            ['createdAt', 'desc']
        ],
        where: whereOpt
    })

    return resultList.map(item => (item.dataValues))
}



module.exports = {
    createMessage,
    getMessage
}