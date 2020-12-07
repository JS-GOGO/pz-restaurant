const { Compartment } = require('./../../../model/compartment')



module.exports = async(req, res) => {
    //标识 标识当前访问的是用户管理页面，点亮图标
    // req.app.locals.currentLink = 'user';

    //在get里面得到参数，修改错误信息
    const { message, id } = req.query;

    //如果传递了id参数,就是修改操作
    if (id) {
        //修改操作
        let compartment = await Compartment.findOne({ _id: id });
        //渲染用户编辑页面
        res.render('admin/compartment/compartment-edit', {
            message,
            compartment,
            //地址携带需要修改的用户id
            link: '/admin/compartment/compartment-modify?id=' + id,
            button: '修改包间信息'
        });
    } else {
        res.render('admin/compartment/compartment-edit', {
            message,
            //创建用户操作提交表单的地址
            link: '/admin/compartment/compartment-edit',
            button: '添加包间信息'
        });
    }




}