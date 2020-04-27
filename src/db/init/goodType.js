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
    name: "蓝牙音响",
  },
  {
    pid: 0,
    name: "U盘",
  },
  {
    pid: 0,
    name: "移动电源",
  },
  {
    pid: 0,
    name: "耳机",
  },
  {
    pid: 0,
    name: "CPU",
  },
  {
    pid: 0,
    name: "主板",
  },
  {
    pid: 0,
    name: "摄像机",
  },
];
const initFunc = initDataArr.map((item) => {
  return GoodType.create(item);
});

Promise.all(initFunc).then((res) => console.log("ok"));
