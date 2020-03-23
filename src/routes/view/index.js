/**
 * @description user view 路由
 */

const router = require('koa-router')()
const {
    loginRedirect
} = require('../../middlewares/loginChecks')

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
    await ctx.render('setting', ctx.session.userInfo)
})

router.get('/mall', async (ctx, next) => {
    await ctx.render('mall', ctx)
})

router.get('/good/:id', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/begmall', async (ctx, next) => {
    await ctx.render('begmall', ctx)
})

module.exports = router