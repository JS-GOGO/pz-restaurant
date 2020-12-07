const { Menu } = require('../../../model/menu')
const formidable = require('formidable');
const path = require('path');


module.exports = async(req, res, next) => {


    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置——绝对路径
    form.uploadDir = path.join(__dirname, '../', '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀名
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        //fields 对象，保存表单普通数据
        //files 对象，保存表单上传文件数据
        // 获取上传文件地址-files.cover.path 获取的是来自本机电脑上传文件的地址C:\XXX\XXX\...
        // 需要对本机地址字符串拆分,以public（上传文件存储位置，参考uploadDir）拆分成两段，取第二段
        // res.send(files.cover.path)
        // 问题：cover存的地址应该是 / ，本机地址是\ ，这里是怎么把\变成/的？
        // res.send(files.cover.path.split('public')[1])
        let menu = await Menu.findOne({ menuname: fields.menuname });
        //如果菜品
        if (menu) {
            //重定向到用户信息页面并在地址上添加错误信息
            return next(JSON.stringify({ path: '/admin/menu/menu-edit', message: '该菜品已创建，请选择其他菜品名' }));
        }
        await Menu.create({
            menuname: fields.menuname,
            price: fields.price,
            description: fields.description,
            picture: files.picture.path.split('public')[1],
            taste: fields.taste,
            status: fields.status,
            remarks: fields.remarks,
        })
        res.redirect('/admin/menu/menu-show');
    })

}