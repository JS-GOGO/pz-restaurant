const express = require('express');
const admin = express.Router();


admin.get('/order-show', require('./order/order-show'));

module.exports = admin;