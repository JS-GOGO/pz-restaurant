// 如何引入admin.js？？
const express = require('express');
const compartment = express.Router();

// //包间展示
compartment.get('/compartment-show', require('./compartment/compartment-show'))
compartment.get('/compartment-showDetail', require('./compartment/compartment-showDetail'))
    //包间添加
compartment.get('/compartment-edit', require('./compartment/compartment-edit'));
compartment.post('/compartment-edit', require('./compartment/compartment-edit-fn'));
//包间修改
compartment.post('/compartment-modify', require('./compartment/compartment-modify'));
compartment.get('/compartment-modify', require('./compartment/compartment-edit'));
compartment.get('/compartment-modify-status', require('./compartment/compartment-modify-status'));
// 包间删除
compartment.get('/compartment-delete', require('./compartment/compartment-delete'));


module.exports = compartment;