/**
 * @description myBegged API 路由
 */

const router = require("koa-router")();
const {
    addMyBegged
} = require("../../controller/myBegged");

const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/begged");

// 注册路由

router.post("/create", async (ctx, next) => {
    const {
        begId
    } = ctx.request.body;
    const {
        id: userId,
    } = ctx.session.userInfo
    const result = await addMyBegged({
        begId,
        userId
    })
    ctx.body = result
});


module.exports = router;