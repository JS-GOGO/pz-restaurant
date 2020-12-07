const express = require('express');
const admin = express.Router();








// (二级)路由
// 登录页面模块
admin.get('/login', require('./admin/loginPage'))

//创建登录功能路由
admin.post('/login', require('./admin/login'));

//创建用户列表渲染路由
admin.get('/user-show', require('./admin/user-show'));

//创建添加用户页面
admin.get('/user-edit', require('./admin/user-edit'));
//新增用户页面提交表单功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

//实现退出功能
admin.get('/logout', require('./admin/logout'));
//用户修改后提交功能路由
admin.post('/user-modify', require('./admin/user-modify'));
//用户修改信息错误 需要以get方式返回原页面
admin.get('/user-modify', require('./admin/user-modify'));


//(3级)包间路由
admin.use('/compartment', require('./admin/compartment'))
    //(3级)菜单路由
admin.use('/menu', require('./admin/menu'));


// (3级)评论路由
admin.use('/comment', require('./admin/comment'));


// (3级)订单路由
admin.use('/order', require('./admin/order'));

//删除用户路由
admin.get('/delete', require('./admin/user-delete'));


module.exports = admin;