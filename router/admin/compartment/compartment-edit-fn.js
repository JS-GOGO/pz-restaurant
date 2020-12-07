const { Compartment } = require('./../../../model/compartment')



module.exports = async(req, res, next) => {
    let compartment = await Compartment.findOne({ roomname: req.body.roomname });
    //如果已经存在包间
    if (compartment) {
        //重定向到用户信息页面并在地址上添加错误信息
        return next(JSON.stringify({ path: '/admin/compartment/compartment-edit', message: '该包间已创建，请选择其他包间名' }));
    }
    // 将新包间添加到数据库
    await Compartment.create(req.body);
    //重定向到包间显示页面
    res.redirect('/admin/compartment/compartment-show');
}