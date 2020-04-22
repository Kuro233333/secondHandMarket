/**
 * @description user controller
 */

const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../services/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {

    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // { errno: 0, data: {....} }
        return new SuccessModel(userInfo)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 */
async function register({
    userName,
    password,
    gender
}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} realName 真实姓名
 * @param {string} phone 电话
 * @param {string} avatar 头像
 * @param {string} gender 性别
 * @param {string} studentNo 学号
 * @param {string} dormitory 宿舍号
 */
async function changeInfo(ctx, {
    realName,
    phone,
    avatar,
    gender,
    studentNo,
    dormitory,
    clazz,
    addr
}) {
    const {
        userName
    } = ctx.session.userInfo
    if (!realName) {
        realName = userName
    }

    const result = await updateUser({
        newNickName: realName,
        newPhone: phone,
        newAvatar: avatar,
        newGender: gender,
        newStudentNo: studentNo,
        newDormitory: dormitory,
        newClazz: clazz,
        newAddr: addr
    }, {
        userName
    })
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            realName,
            phone,
            avatar,
            gender,
            studentNo,
            dormitory,
            clazz,
            addr
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser({
        newPassword: doCrypto(newPassword)
    }, {
        userName,
        password: doCrypto(password)
    })
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}