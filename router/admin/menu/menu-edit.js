const { Menu } = require('../../../model/menu')



module.exports = async(req, res) => {


    //在get里面得到参数，修改错误信息
    const { message, id } = req.query;

    //如果传递了id参数,就是修改操作
    if (id) {
        //修改操作
        let menu = await Menu.findOne({ _id: id });
        //渲染用户编辑页面
        res.render('admin/menu/menu-edit', {
            message,
            menu,
            //地址携带需要修改的用户id
            link: '/admin/menu/menu-modify?id=' + id,
            button: '修改菜品信息'

        });
    } else {
        res.render('admin/menu/menu-edit', {
            message,
            //创建用户操作提交表单的地址
            link: '/admin/menu/menu-edit',
            button: '添加菜品信息'
        });
    }




}