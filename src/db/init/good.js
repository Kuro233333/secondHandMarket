const Good = require("../model/Good");

const initDataArr = [{
    name: "测试名字2",
    level: "1",
    price: 123,
    sort1: 1,
    sort2: 1,
    typeName: "手机-苹果",
    count: 3,
    remark: "sdfasdasd",
    image: "/123.jpg",
    hot: 10,
    userId: 1
}, {
    name: "测试名字3",
    level: "2",
    price: 123,
    sort1: 0,
    sort2: 0,
    typeName: "手机-三星",
    count: 1,
    remark: "asdasda",
    image: "/123.jpg",
    hot: 2,
    userId: 2
}]
const initFunc = initDataArr.map(item => {
    return Good.create(item)
})

Promise.all(initFunc).then(res => console.log('ok'))