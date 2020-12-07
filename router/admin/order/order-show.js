module.exports = async(req, res) => {
    //标识 标识当前访问的是用户管理页面，点亮图标
    req.app.locals.currentLink = 'order';
    res.render('admin/order/order-show')
};