const Beg = require("../model/Beg");

const initDataArr = [{
    name: "测试名字2 beg",
    price: 123,
    sort1: '1',
    sort2: '3',
    typeName: "手机-苹果",
    count: 3,
    remark: "sdfasdasd",
    userId: 1
}, {
    name: "测试名字3 beg",
    price: 123,
    sort1: '1',
    sort2: '4',
    typeName: "手机-三星",
    count: 1,
    remark: "asdasda",
    userId: 2
}]
const initFunc = initDataArr.map(item => {
    return Beg.create(item)
})

Promise.all(initFunc).then(res => console.log('ok'))