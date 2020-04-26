const GoodType = require("../model/GoodType");

const initDataArr = [
  {
    pid: 0,
    name: "手机",
  },
  {
    pid: 0,
    name: "笔记本整机",
  },
  {
    pid: 0,
    name: "相机",
  },
  {
    pid: 0,
    name: "数码",
  },
  {
    pid: 0,
    name: "DIY硬件",
  },
  {
    pid: 0,
    name: "家电",
  },
  {
    pid: 0,
    name: "办公投影",
  },
  {
    pid: 0,
    name: "游戏机",
  },
  // 手机
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
    name: "荣耀",
  },
  {
    pid: 1,
    name: "小米",
  },
  {
    pid: 1,
    name: "一加",
  },
  {
    pid: 1,
    name: "其他手机",
  },
  // 笔记本
  {
    pid: 2,
    name: "华为",
  },
  {
    pid: 2,
    name: "戴尔",
  },
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
    name: "苹果",
  },
  {
    pid: 2,
    name: "ThinkPad",
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
    name: "徕卡",
  },
  {
    pid: 3,
    name: "哈苏",
  },
  {
    pid: 3,
    name: "其他相机",
  },
  // 数码
  {
    pid: 4,
    name: "音频播放器",
  },
  {
    pid: 4,
    name: "MP3",
  },
  {
    pid: 4,
    name: "MP4",
  },
  {
    pid: 4,
    name: "移动电源(充电宝)",
  },
  {
    pid: 4,
    name: "耳机",
  },
  {
    pid: 4,
    name: "蓝牙音响",
  },
  {
    pid: 4,
    name: "U盘",
  },
  {
    pid: 4,
    name: "其他数码",
  },
  // DIY硬件
  {
    pid: 5,
    name: "主板",
  },
  {
    pid: 5,
    name: "显卡",
  },
  {
    pid: 5,
    name: "CPU",
  },
  {
    pid: 5,
    name: "内存",
  },
  {
    pid: 5,
    name: "硬盘",
  },
  {
    pid: 5,
    name: "机箱",
  },
  {
    pid: 5,
    name: "散热器",
  },
  {
    pid: 5,
    name: "其他硬件",
  },
  // 家电
  {
    pid: 6,
    name: "平板电视",
  },
  {
    pid: 6,
    name: "空调",
  },
  {
    pid: 6,
    name: "冰箱",
  },
  {
    pid: 6,
    name: "洗衣机",
  },
  {
    pid: 6,
    name: "家庭影院",
  },
  {
    pid: 6,
    name: "蓝光播放器",
  },
  {
    pid: 6,
    name: "迷你音响",
  },
  {
    pid: 6,
    name: "其他家电",
  },
  // 办公投影
  {
    pid: 7,
    name: "UPS电源",
  },
  {
    pid: 7,
    name: "打印机",
  },
  {
    pid: 7,
    name: "多功能一体机",
  },
  {
    pid: 7,
    name: "投影机",
  },
  {
    pid: 7,
    name: "复印机",
  },
  {
    pid: 7,
    name: "传真机",
  },
  {
    pid: 7,
    name: "打印介质",
  },
  {
    pid: 7,
    name: "其他办公投影",
  },
  // 游戏机
  {
    pid: 8,
    name: "掌上游戏机",
  },
  {
    pid: 8,
    name: "游戏机",
  },
  {
    pid: 8,
    name: "手柄",
  },
  {
    pid: 8,
    name: "游戏机包/盒",
  },
  {
    pid: 8,
    name: "游戏机套",
  },
  {
    pid: 8,
    name: "游戏摇杆",
  },
  {
    pid: 8,
    name: "游戏周边",
  },
  {
    pid: 8,
    name: "其他游戏产品",
  },
];
const initFunc = initDataArr.map((item) => {
  return GoodType.create(item);
});

Promise.all(initFunc).then((res) => console.log("ok"));
