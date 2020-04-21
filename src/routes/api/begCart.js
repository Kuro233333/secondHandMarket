/**
 * @description begCart API 路由
 */

const router = require("koa-router")();
const {
    addBegCart,
    deleteCurBegCart
} = require("../../controller/begCart");
const {
    changeBegInfo
} = require("../../controller/beg");

const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/begcart");

// 注册路由

router.post("/create", async (ctx, next) => {
    const {
        begId,
        userId
    } = ctx.request.body;
    const result = await addBegCart({
        begId,
        userId
    })
    ctx.body = result
});

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    const {
        begCartId
    } = ctx.request.body;
    ctx.body = await deleteCurBegCart(begCartId)
})

router.post("/jiesuan", async (ctx, next) => {
    const {
        begId,
        begCartId
    } = ctx.request.body;
    await deleteCurBegCart(begCartId)
    const result = await changeBegInfo(begId, {
        isPay: true
    })
    ctx.body = result
});

module.exports = router;