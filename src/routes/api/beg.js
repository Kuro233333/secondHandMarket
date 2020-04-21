/**
 * @description beg API 路由
 */

const router = require("koa-router")();
const {
    getBegList,
    getMyBegList,
    addBeg,
    deleteCurBeg,
    changeBegInfo,
} = require("../../controller/beg");

const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/beg");

// 注册路由

router.get("/list/:pageIndex", async (ctx, next) => {
    function urlToObj(str) {
        var obj = {};
        var arr1 = str.split("?");
        if (!arr1[1]) {
            return {}
        }
        var arr2 = arr1[1].split("&");
        for (var i = 0; i < arr2.length; i++) {
            var res = arr2[i].split("=");
            obj[res[0]] = res[1];
        }
        return obj;
    }
    let {
        pageIndex
    } = ctx.params

    let params = urlToObj(ctx.request.url)
    console.log(params)
    const {
        sort2,
        keyword
    } = params
    const result = await getBegList({
        pageIndex,
        sort2,
        keyword
    })
    ctx.body = result
});

router.post("/add", async (ctx, next) => {
    const {
        name,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark
    } = ctx.request.body;
    const {
        id: userId
    } = ctx.session.userInfo
    const result = await addBeg({
        userId,
        name,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark
    })
    ctx.body = result
});

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    const {
        begId
    } = ctx.request.body;
    ctx.body = await deleteCurBeg(begId)
})


router.post("/edit", async (ctx, next) => {
    const {
        begId,
        name,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        isPick,
        isPay
    } = ctx.request.body;

    const result = await changeBegInfo(begId, {
        name,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        isPick,
        isPay
    })
    ctx.body = result
});

module.exports = router;