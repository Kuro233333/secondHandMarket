/**
 * @description user view 路由
 */

const router = require('koa-router')()
const {
    loginRedirect
} = require('../../middlewares/loginChecks')
const {
    getGoodTypesList,
    getMyGoodList,
    getGoodDetail
} = require("../../controller/good")
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

router.get('/typesetting', loginRedirect, async (ctx, next) => {
    // 获取分类
    const typeResult = await getGoodTypesList()
    const typesData = typeResult.data.map(item => {
        item.text2 = item.children.map(child => {
            return child.name
        }).join("\n")
        return item
    })
    console.log(typesData)
    await ctx.render('typeSetting', {
        userName: ctx.session.userInfo.userName,
        isLogin: true,
        typesData
    })
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
    // 获取我的商品列表
    const goodResult = await getMyGoodList({
        userId: ctx.session.userInfo.id
    })
    const info = getLoginInfo(ctx)

    await ctx.render('mygood', Object.assign(info, {
        goodList: goodResult.data.goodList
    }))
})

router.get('/mybeg', async (ctx, next) => {
    await ctx.render('mybeg', getLoginInfo(ctx))
})


router.get('/good/edit/:id', async (ctx, next) => {
    const typeResult = await getGoodTypesList()
    const goodId = ctx.request.url.split("/")[ctx.request.url.split("/").length - 1]
    const goodRes = await getGoodDetail(goodId)
    await ctx.render('mygoodForm', Object.assign(getLoginInfo(ctx), {
        typesData: typeResult.data,
        goodData: goodRes.data,
        formType: 'edit'
    }))
})
router.get('/addgood', async (ctx, next) => {
    const typeResult = await getGoodTypesList()
    await ctx.render('mygoodForm', Object.assign(getLoginInfo(ctx), {
        typesData: typeResult.data,
        goodData: "",
        formType: 'add'
    }))
})



module.exports = router