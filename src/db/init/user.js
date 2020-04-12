const User = require("../model/User");
const doCrypto = require('../../utils/cryp')
const initDataArr = [{
    userName: "admin",
    password: doCrypto("admin"),
    gender: 3,
    realName: "admin"
}, {
    userName: "kuro",
    password: doCrypto("123456"),
    gender: 3,
    realName: "kuro"
}]
const initFunc = initDataArr.map(item => {
    return User.create(item)
})

Promise.all(initFunc).then(res => console.log('ok'))