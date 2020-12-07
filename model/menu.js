//创建集合规则
const mongoose = require('mongoose');
//记得加版本号
const Joi = require('joi');


const menuschema = new mongoose.Schema({
        menuname: {
            type: String,
            //保证数据不重复
            unique: true,
            require: true,
            minlength: 1,
            maxlength: 15
        },
        price: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            require: true
        },
        taste: {
            type: String,
            default: '无'
        },
        status: {
            type: Boolean,
            require: true,
        },
        time: {
            type: String,
            default: new Date()
        },
        remarks: {
            type: String,
            require: true,
        },
        picture: {
            type: String,
            default: null
        },
    })
    //     //创建关联集合存储数组（可选口味）
    // const menuTasteschema = new mongoose.Schema({
    //     tasteItems: {
    //         type: String,
    //     }
    // });

// 集合规则的构造函数
const Menu = mongoose.model('Menu', menuschema)

//插入一个用户，要是数据都删完了可以来这里添加
async function createMenu() {
    const menu = await Menu.create({
        menuname: '双色鱼头',
        price: 60,
        description: '又辣又麻，非常符合湖南人口味',
        taste: ['不辣'],
        status: true,
        remarks: '顾客不吃香菜',
        picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2832617319,835100835&fm=26&gp=0.jpg'

    });
    console.log('菜品创建成功');
}
// 打开这里,运行一遍app.js后关掉,就可以得到一个密码为123456的用户,如果是删除了数据库,注意数据库连接
// createMenu();    




// 导出集合
module.exports = {
    //相当于 User = User
    Menu
};