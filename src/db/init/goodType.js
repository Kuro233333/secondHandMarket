const GoodType = require("../model/GoodType");

const initDataArr = [{
        pid: 0,
        name: "手机"
    },
    {
        pid: 0,
        name: "电脑"
    },
    {
        pid: 1,
        name: "苹果"
    },
    {
        pid: 1,
        name: "三星"
    },
    {
        pid: 2,
        name: "华为"
    },
    {
        pid: 2,
        name: "戴尔"
    },
]
const initFunc = initDataArr.map(item => {
    return GoodType.create(item)
})

Promise.all(initFunc).then(res => console.log('ok'))