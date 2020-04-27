/**
 * @description begCart API 路由
 */

const router = require("koa-router")();
const { addBegCart, deleteCurBegCart } = require("../../controller/begCart");
const { changeBegInfo } = require("../../controller/beg");
const { addMessage } = require("../../controller/message");
const { loginCheck } = require("../../middlewares/loginChecks");

router.prefix("/api/begcart");

// 注册路由

router.post("/create", async (ctx, next) => {
  const { begId, begName, userId, userName } = ctx.request.body;
  const { id: myId, userName: myName } = ctx.session.userInfo;
  await addMessage({
    content: `我已接单你的求购商品${begName},请尽快结算。`,
    userId: myId,
    receivedId: userId,
    receivedName: userName,
    userName: myName,
  });
  await changeBegInfo(begId, {
    jdName: myName,
    jdId: myId,
  });
  const result = await addBegCart({
    begId,
    userId,
  });
  ctx.body = result;
});

// 删除
router.post("/delete", loginCheck, async (ctx, next) => {
  const { begCartId } = ctx.request.body;
  ctx.body = await deleteCurBegCart(begCartId);
});

router.post("/jiesuan", async (ctx, next) => {
  const { begCartIds, begIds, receiveds, beggeds } = ctx.request.body;
  const { id: userId, userName, addr, phone } = ctx.session.userInfo;

  // 求购变为已支付
  begIds.forEach(async (item) => {
    await changeBegInfo(item, {
      isPay: true,
    });
  });

  // 清空求购购物车
  begCartIds.forEach(async (item) => {
    await deleteCurBegCart(item);
  });
  // 发送消息
  receiveds.forEach(async (item) => {
    await addMessage({
      content: `我已结算求购商品${item.begname},我的电话是${phone},地址是${addr}。`,
      userId,
      receivedId: item.jdId,
      receivedName: item.jdName,
      userName,
    });
  });

  ctx.body = "";
});

module.exports = router;
