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

router.get("/list", async (ctx, next) => {
    let {
        pageIndex,
        pageSize,
        filter,
        sort1,
        sort2,
        userId
    } = ctx.params
    const result = await getGoodList({
        userId,
        pageIndex,
        pageSize,
        filter,
        sort1,
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

module.exports = router;