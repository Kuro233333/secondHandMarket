/**
 * @description good API 路由
 */

const router = require("koa-router")();
const {
    getGoodTypesList,
    getGoodList,
    saveTypes,
    addGood,
    deleteCurGood,
    changeGoodInfo
} = require("../../controller/good");
const {
    addGoodLeave
} = require("../../controller/goodLeave")
const userValidate = require("../../validator/user");
const {
    genValidator
} = require("../../middlewares/validator");
const {
    isTest
} = require("../../utils/env");
const {
    loginCheck
} = require("../../middlewares/loginChecks");

router.prefix("/api/good");

// 注册路由
router.get("/types", async (ctx, next) => {
    const result = await getGoodTypesList()
    ctx.body = result
});

router.post("/types", async (ctx, next) => {
    const {
        typesArray
    } = ctx.request.body;
    const result = await saveTypes(typesArray)
    ctx.body = result
});

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
        filter,
        sort2
    } = params
    const result = await getGoodList({
        pageIndex,
        filter,
        sort2
    })
    ctx.body = result
});

router.post("/add", async (ctx, next) => {
    const {
        name,
        level,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        image
    } = ctx.request.body;
    const {
        id: userId
    } = ctx.session.userInfo
    const result = await addGood({
        userId,
        name,
        level,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        image
    })
    ctx.body = result
});

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    const {
        goodId
    } = ctx.request.body;
    ctx.body = await deleteCurGood(goodId)
})


router.post("/edit", async (ctx, next) => {
    const {
        goodId,
        name,
        level,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        image
    } = ctx.request.body;
    console.log('api', goodId, count)
    const result = await changeGoodInfo(goodId, {
        name,
        level,
        price,
        sort1,
        sort2,
        typeName,
        count,
        remark,
        image
    })
    ctx.body = result
});

router.post("/leave", loginCheck, async (ctx, next) => {
    console.log(ctx.session.userInfo)
    const {
        goodId,
        content
    } = ctx.request.body;
    const {
        id: userId,
        userName
    } = ctx.session.userInfo
    const result = await addGoodLeave({
        userId,
        goodId,
        content,
        userName
    })
    ctx.body = result
});

module.exports = router;