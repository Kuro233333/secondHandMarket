/**
 * @description cart API 路由
 */

const router = require("koa-router")();
const {
  addCart,
  deleteCurCart,
  isCartExit,
  changeCartInfo,
} = require("../../controller/cart");

const { changeGoodInfo } = require("../../controller/good");
const { addMessage } = require("../../controller/message");
const { addMyBoughts } = require("../../controller/myBought");

const { loginCheck } = require("../../middlewares/loginChecks");

router.prefix("/api/cart");

// 注册路由

router.post("/create", async (ctx, next) => {
  const { goodId, ownerId, ownerName } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  const result = await addCart({
    goodId,
    userId,
    ownerId,
    ownerName,
  });
  ctx.body = result;
});

// 删除
router.post("/delete", loginCheck, async (ctx, next) => {
  const { cartId } = ctx.request.body;
  ctx.body = await deleteCurCart(cartId);
});
// isExited
router.get("/exit/:goodId", loginCheck, async (ctx, next) => {
  const { goodId } = ctx.params;
  console.log(goodId);
  ctx.body = await isCartExit({
    goodId,
    userId: ctx.session.userInfo.id,
  });
});

router.post("/add", async (ctx, next) => {
  const { cartId, quantity } = ctx.request.body;
  const result = await changeCartInfo(cartId, {
    quantity,
  });
  ctx.body = result;
});

router.post("/jiesuan", async (ctx, next) => {
  const {
    counts,
    boughts,
    goodIds,
    cartIds,
    quantitys,
    receiveds,
  } = ctx.request.body;
  const { id: userId, userName, addr, phone } = ctx.session.userInfo;

  // 改变商品库存
  goodIds.forEach(async (item, idx) => {
    await changeGoodInfo(parseInt(item), {
      count: counts[idx] - quantitys[idx],
    });
    console.log(item);
  });
  // 清空购物车
  cartIds.forEach(async (item) => {
    await deleteCurCart(item);
  });
  // 发送消息
  receiveds.forEach(async (item) => {
    await addMessage({
      content: `我已购你的商品${item.goodName},我的电话是${phone},地址是${addr}。`,
      userId,
      receivedId: item.id,
      receivedName: item.name,
      userName,
    });
  });

  // 批量添加到已买
  const arr = boughts.map((item) => {
    item.userId = userId;
    return item;
  });
  const result = await addMyBoughts(arr);
  ctx.body = result;
});

module.exports = router;
