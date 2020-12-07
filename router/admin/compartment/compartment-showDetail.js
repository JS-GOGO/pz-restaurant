const { Compartment } = require('./../../../model/compartment')
const { Menu } = require('./../../../model/menu')

module.exports = async(req, res) => {
    //标识 标识当前访问的是用户管理页面，点亮图标
    req.app.locals.currentLink = 'compartment';

    const id = req.query.id;

    const menus = await Menu.find({});

    //查找数据库所有文档传给渲染页面
    const compartments = await Compartment.find({ _id: id });
    // let sequence = 0;
    // sequence++;
    res.render('admin/compartment/compartment-showDetail', {
        menus
    })
}