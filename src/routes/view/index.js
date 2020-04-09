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

router.get('/', async (ctx, next) => {
    await ctx.render('index', getLoginInfo(ctx))
})

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
    console.log(ctx.session.userInfo)
    var userInfo = Object.assign({
        isLogin: true
    }, ctx.session.userInfo)
    await ctx.render('setting', userInfo)
})

router.get('/mall', async (ctx, next) => {
    await ctx.render('mall', ctx)
})

router.get('/good/:id', async (ctx, next) => {
    await ctx.render('detail', getLoginInfo(ctx))
})

router.get('/begmall', async (ctx, next) => {
    await ctx.render('begmall', ctx)
})

router.get('/cart', async (ctx, next) => {
    await ctx.render('cart', getLoginInfo(ctx))
})

router.get('/mygood', async (ctx, next) => {
    await ctx.render('mygood', getLoginInfo(ctx))
})

router.get('/mybeg', async (ctx, next) => {
    await ctx.render('mybeg', getLoginInfo(ctx))
})


router.get('/good/edit/:id', async (ctx, next) => {
    await ctx.render('mygoodForm', getLoginInfo(ctx))
})
router.get('/addgood', async (ctx, next) => {
    await ctx.render('mygoodForm', getLoginInfo(ctx))
})



module.exports = router