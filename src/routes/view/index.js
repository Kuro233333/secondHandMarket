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
    getGoodDetail,
    getGoodList,
    changeGoodInfo
} = require("../../controller/good")
const {
    getMyBegList,
    getBegList,
    getBegDetail
} = require("../../controller/beg")
const {
    getMessageList
} = require("../../controller/message")
const {
    getCartList
} = require("../../controller/cart")
const {
    getBegCartList
} = require("../../controller/begCart")
const {
    getMyBoughtsList
} = require("../../controller/myBought")
const {
    getMyBeggedsList
} = require("../../controller/myBegged")
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
    const goodsResult = await getGoodList({
        filter: 'hot',
        pageIndex: 0
    })
    await ctx.render('index', Object.assign(getLoginInfo(ctx), {
        goodsData: goodsResult.data
    }))
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
    const typeResult = await getGoodTypesList()
    const goodsResult = await getGoodList({
        filter: 'hot',
        pageIndex: 0
    })
    await ctx.render('mall', Object.assign(getLoginInfo(ctx), {
        typesData: typeResult.data,
        goodsData: goodsResult.data
    }))
})

router.get('/begmall', async (ctx, next) => {
    const typeResult = await getGoodTypesList()
    const begResult = await getBegList({
        filter: 'hot',
        pageIndex: 0
    })
    await ctx.render('begmall', Object.assign(getLoginInfo(ctx), {
        typesData: typeResult.data,
        begsData: begResult.data
    }))
})


router.get("/search/:keyword", async (ctx, next) => {
    let {
        keyword
    } = ctx.params
    const goodsResult = await getGoodList({
        keyword,
        pageSize: 100
    })
    await ctx.render('search', Object.assign(getLoginInfo(ctx), {
        keyword,
        goodsData: goodsResult.data
    }))
});

router.get('/good/:id', async (ctx, next) => {
    let {
        id
    } = ctx.params
    const goodRes = await getGoodDetail(id)
    await changeGoodInfo(id, {
        hot: ++goodRes.data.hot
    })
    await ctx.render('detail', Object.assign(getLoginInfo(ctx), {
        goodData: goodRes.data
    }))
})

router.get('/cart', async (ctx, next) => {
    const result = await getCartList({
        userId: ctx.session.userInfo.id
    })
    console.log("cart", result.data)
    await ctx.render('cart', Object.assign(getLoginInfo(ctx), {
        cart: true,
        cartList: result.data
    }))
})

router.get('/begcart', async (ctx, next) => {
    const result = await getBegCartList({
        userId: ctx.session.userInfo.id
    })
    await ctx.render('begCart', Object.assign(getLoginInfo(ctx), {
        cart: true,
        cartList: result.data
    }))
})

router.get('/msg', async (ctx, next) => {
    const result = await getMessageList({
        userId: ctx.session.userInfo.id
    })
    console.log('msg', result)
    await ctx.render('msg', Object.assign(getLoginInfo(ctx), {
        msgList: result.data
    }))
})

router.get('/send/:id/:name', async (ctx, next) => {
    let {
        id,
        name
    } = ctx.params
    await ctx.render('send', Object.assign(getLoginInfo(ctx), {
        id,
        name
    }))
})

router.get('/myboughts', async (ctx, next) => {
    // 获取我的商品列表
    const goodResult = await getMyBoughtsList({
        userId: ctx.session.userInfo.id
    })
    const info = getLoginInfo(ctx)
    await ctx.render('myboughts', Object.assign(info, {
        boughtsList: goodResult.data
    }))
})
router.get('/mybegged', async (ctx, next) => {
    // 获取我的商品列表
    const goodResult = await getMyBeggedsList({
        userId: ctx.session.userInfo.id
    })
    const info = getLoginInfo(ctx)
    await ctx.render('mybegged', Object.assign(info, {
        boughtsList: goodResult.data
    }))
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
    const begResult = await getMyBegList({
        userId: ctx.session.userInfo.id
    })
    const info = getLoginInfo(ctx)
    await ctx.render('mybeg', Object.assign(info, {
        begList: begResult.data.begList
    }))
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

router.get('/beg/edit/:id', async (ctx, next) => {
    const typeResult = await getGoodTypesList()
    const begId = ctx.request.url.split("/")[ctx.request.url.split("/").length - 1]
    const goodRes = await getBegDetail(begId)
    await ctx.render('mybegForm', Object.assign(getLoginInfo(ctx), {
        typesData: typeResult.data,
        begData: goodRes.data,
        formType: 'edit'
    }))
})
router.get('/addbeg', async (ctx, next) => {
    const typeResult = await getGoodTypesList()
    await ctx.render('mybegForm', Object.assign(getLoginInfo(ctx), {
        typesData: typeResult.data,
        begData: "",
        formType: 'add'
    }))
})



module.exports = router