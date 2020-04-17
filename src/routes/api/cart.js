/**
 * @description cart API 路由
 */

const router = require("koa-router")();
const {
    addCart,
    deleteCurCart,
    isCartExit,
    changeCartInfo
} = require("../../controller/cart");

const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/cart");

// 注册路由

router.post("/create", async (ctx, next) => {
    const {
        goodId
    } = ctx.request.body;
    const {
        id: userId
    } = ctx.session.userInfo
    const result = await addCart({
        goodId,
        userId
    })
    ctx.body = result
});

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    const {
        cartId
    } = ctx.request.body;
    ctx.body = await deleteCurCart(cartId)
})
// isExited
router.get('/exit/:goodId', loginCheck, async (ctx, next) => {
    const {
        goodId
    } = ctx.params;
    console.log(goodId)
    ctx.body = await isCartExit({
        goodId,
        userId: ctx.session.userInfo.id
    })
})

router.post("/add", async (ctx, next) => {
    const {
        cartId,
        quantity
    } = ctx.request.body;
    const result = await changeCartInfo(cartId, {
        quantity
    })
    ctx.body = result
});


module.exports = router;