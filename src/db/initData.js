const GoodType = require("./model/GoodType");

const initDataArr = [{
        parentId: 0,
        level: 1,
        name: "数码科技"
    },
    {
        parentId: 1,
        level: 2,
        name: "手机"
    },
    {
        parentId: 1,
        level: 2,
        name: "电脑"
    },
    {
        parentId: 1,
        level: 2,
        name: "相机"
    },
    {
        parentId: 2,
        level: 3,
        name: "苹果"
    },
    {
        parentId: 2,
        level: 3,
        name: "华为"
    },
    {
        parentId: 2,
        level: 3,
        name: "三星"
    }
]
const initFunc = initDataArr.map(item => {
    return GoodType.create(item)
})
Promise.all(initFunc).then(res => console.log('ok'))