const express = require('express');
const menu = express.Router();


// //菜品展示
menu.get('/menu-show', require('./menu/menu-show'))
    //菜品添加
menu.get('/menu-edit', require('./menu/menu-edit'));
menu.post('/menu-edit', require('./menu/menu-edit-fn'));
//菜品修改
menu.post('/menu-modify', require('./menu/menu-modify'));
menu.get('/menu-modify', require('./menu/menu-edit'));
// menu.get('/menu-modify-status', require('./menu/menu-modify-status'));
// 菜品删除
menu.get('/menu-delete', require('./menu/menu-delete'));


menu.get('/menu-show', require('./menu/menu-show'));

module.exports = menu;