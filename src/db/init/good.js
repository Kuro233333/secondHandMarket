const Good = require("../model/Good");

const initDataArr = [{
    name: "测试名字2",
    level: "",
    price: 123,
    sort1: 0,
    sort2: 0,
    typeName: "手机-苹果",
    count: 1,
    remark: "",
    image: "/123.jpg",
    hot: 10,
    userId: 1
}, {
    name: "测试名字3",
    level: "",
    price: 123,
    sort1: 0,
    sort2: 0,
    typeName: "手机-三星",
    count: 1,
    remark: "",
    image: "/123.jpg",
    hot: 2,
    userId: 2
}]
const initFunc = initDataArr.map(item => {
    return Good.create(item)
})

Promise.all(initFunc).then(res => console.log('ok'))