/**
 * @description good API 路由
 */

const router = require("koa-router")();
const {
    getGoodTypesList,
    getGoodList,
    saveTypes,
    addGood
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
    console.log("typesArray11222222223", ctx.request.body)
    const result = await saveTypes(typesArray)
    ctx.body = result
});

router.get("/list", async (ctx, next) => {
    let {
        pageIndex,
        pageSize,
        filter,
        type
    } = ctx.params
    const result = await getGoodList({
        pageIndex,
        pageSize,
        filter,
        type
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
        count,
        remark,
        image
    } = ctx.request.body;
    const result = await addGood({
        name,
        level,
        price,
        sort1,
        sort2,
        count,
        remark,
        image
    })
    ctx.body = result
});

module.exports = router;