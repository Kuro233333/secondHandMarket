const GoodType = require("../model/GoodType");

const initDataArr = [
  // 手机
  {
    pid: 1,
    name: "华为",
  },
  {
    pid: 1,
    name: "vivo",
  },
  {
    pid: 1,
    name: "OPPO",
  },
  {
    pid: 1,
    name: "苹果",
  },
  {
    pid: 1,
    name: "三星",
  },
  {
    pid: 1,
    name: "小米",
  },
  {
    pid: 1,
    name: "魅族",
  },
  {
    pid: 1,
    name: "中兴",
  },
  {
    pid: 1,
    name: "锤子",
  },
  {
    pid: 1,
    name: "其他手机",
  },
  // 笔记本
  {
    pid: 2,
    name: "华硕",
  },
  {
    pid: 2,
    name: "联想",
  },
  {
    pid: 2,
    name: "惠普",
  },
  {
    pid: 2,
    name: "戴尔",
  },
  {
    pid: 2,
    name: "苹果",
  },
  {
    pid: 2,
    name: "华为",
  },
  {
    pid: 2,
    name: "外星人",
  },
  {
    pid: 2,
    name: "机械革命",
  },
  {
    pid: 2,
    name: "其他笔记本",
  },
  // 相机
  {
    pid: 3,
    name: "佳能",
  },
  {
    pid: 3,
    name: "尼康",
  },
  {
    pid: 3,
    name: "索尼",
  },
  {
    pid: 3,
    name: "富士",
  },
  {
    pid: 3,
    name: "松下",
  },
  {
    pid: 3,
    name: "其他相机",
  },
  // 蓝牙音响
  {
    pid: 4,
    name: "华为",
  },
  {
    pid: 4,
    name: "JBL",
  },
  {
    pid: 4,
    name: "索尼",
  },
  {
    pid: 4,
    name: "小米",
  },
  {
    pid: 4,
    name: "BOSE",
  },
  {
    pid: 4,
    name: "其他蓝牙音响",
  },
  // U盘
  {
    pid: 5,
    name: "金士顿",
  },
  {
    pid: 5,
    name: "惠普",
  },
  {
    pid: 5,
    name: "三星",
  },
  {
    pid: 5,
    name: "闪迪",
  },
  {
    pid: 5,
    name: "爱国者",
  },
  {
    pid: 5,
    name: "其他U盘",
  },
  // 移动电源
  {
    pid: 6,
    name: "华为",
  },
  {
    pid: 6,
    name: "罗马仕",
  },
  {
    pid: 6,
    name: "小米",
  },
  {
    pid: 6,
    name: "品胜",
  },
  {
    pid: 6,
    name: "其他移动电源",
  },
  // 耳机
  {
    pid: 7,
    name: "华为",
  },
  {
    pid: 7,
    name: "苹果",
  },
  {
    pid: 7,
    name: "1MORE",
  },
  {
    pid: 7,
    name: "索尼",
  },
  {
    pid: 7,
    name: "JBL",
  },
  {
    pid: 7,
    name: "三星",
  },
  {
    pid: 7,
    name: "BOSE",
  },
  {
    pid: 7,
    name: "铁三角",
  },
  {
    pid: 7,
    name: "AKG爱科技",
  },
  {
    pid: 7,
    name: "飞利浦",
  },
  {
    pid: 7,
    name: "高斯",
  },
  {
    pid: 7,
    name: "其他耳机",
  },
  // CPU
  {
    pid: 8,
    name: "Intel",
  },
  {
    pid: 8,
    name: "AMD",
  },
  {
    pid: 8,
    name: "龙芯",
  },
  {
    pid: 8,
    name: "其他CPU",
  },
  // 主板
  {
    pid: 9,
    name: "华硕",
  },
  {
    pid: 9,
    name: "技嘉",
  },
  {
    pid: 9,
    name: "映泰",
  },
  {
    pid: 9,
    name: "影驰",
  },
  {
    pid: 9,
    name: "msi微星",
  },
  {
    pid: 9,
    name: "其他主板",
  },
  // 摄像机
  {
    pid: 10,
    name: "SONY索尼",
  },
  {
    pid: 10,
    name: "Ganon佳能",
  },
  {
    pid: 10,
    name: "Panasonic松下",
  },
  {
    pid: 10,
    name: "JVC杰伟世",
  },
  {
    pid: 10,
    name: "Kodak柯达",
  },
  {
    pid: 10,
    name: "Nikon尼康",
  },
  {
    pid: 10,
    name: "GARMIN佳明",
  },
  {
    pid: 10,
    name: "其他摄像头",
  },
];
const initFunc = initDataArr.map((item) => {
  return GoodType.create(item);
});

Promise.all(initFunc).then((res) => console.log("ok"));
