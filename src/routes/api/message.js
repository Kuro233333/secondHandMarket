/**
 * @description good API 路由
 */

const router = require("koa-router")();
const {
    addMessage
} = require("../../controller/message");

const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/message");

// 注册路由

router.post("/create", async (ctx, next) => {
    const {
        content,
        receivedId,
        receivedName
    } = ctx.request.body;
    const {
        id: userId,
        userName
    } = ctx.session.userInfo
    const result = await addMessage({
        content,
        receivedId,
        receivedName,
        userName,
        userId
    })
    ctx.body = result
});


module.exports = router;