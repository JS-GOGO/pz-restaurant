//创建包间集合规则
const mongoose = require('mongoose');

// 类似联表
const { Menu } = require('./menu')
let menus = [];
async function getMenus() {
    menus = await Menu.find({});
}
getMenus()
    //因为异步，这里的不到menus的值 可否直接导出这堆函数，并且附带Compartment变量
console.log(menus, 'comparment');

const cpchema = new mongoose.Schema({
    roomname: {
        type: String,
        require: true,
    },
    menu: {
        //关联菜单
        type: Array,
        default: menus
    },
    time: {
        type: String,
        default: new Date()
    },
    status: {
        type: Boolean,
        require: true,
    },
})

// 集合规则的构造函数
const Compartment = mongoose.model('compartment', cpchema)

async function createUser() {
    const user = await Compartment.create({
        roomname: '湘缘',
        status: true
    });
    console.log('包间创建成功');
}
// 创建一个菜单
// createUser();


// 导出集合
module.exports = {
    Compartment
};