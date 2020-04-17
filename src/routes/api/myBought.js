/**
 * @description myBought API 路由
 */

const router = require("koa-router")();
const {
    addMyBoughts
} = require("../../controller/myBought");

const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/bought");

// 注册路由

router.post("/create", async (ctx, next) => {
    const {
        boughts
    } = ctx.request.body;
    const {
        id: userId,
    } = ctx.session.userInfo
    const arr = boughts.map(item => {
        item.userId = userId
        return item
    })
    const result = await addMyBoughts(arr)
    ctx.body = result
});


module.exports = router;