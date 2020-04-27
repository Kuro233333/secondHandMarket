/*
 * 初始化数据库
 */

require("./init/goodType");
setTimeout(function () {
  require("./init/goodType2");
}, 1000);
setTimeout(function () {
  require("./init/user");
}, 1000);

// require("./init/good");
// require("./init/beg");
