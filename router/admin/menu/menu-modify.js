const { Menu } = require('../../../model/menu')
const formidable = require('formidable');
const path = require('path');


module.exports = async(req, res, next) => {
    let { id, Cstatus, Change, picture } = req.query;
    console.log(picture, '图片');
    if (Cstatus == 'true') {
        Cstatus = false
    } else {
        Cstatus = true

    }
    //根据Change判断改状态还是改全部，
    if (Change) { //只更改状态
        await Menu.updateOne({ _id: id }, {
            status: Cstatus
        })
        res.redirect('/admin/menu/menu-show')
    } else {
        const form = new formidable.IncomingForm();
        // 2.配置上传文件的存放位置——绝对路径
        form.uploadDir = path.join(__dirname, '../', '../', '../', 'public', 'uploads');
        // 3.保留上传文件的后缀名
        form.keepExtensions = true;
        // 4.解析表单
        form.parse(req, async(err, fields, files) => {

            await Menu.updateOne({ _id: id }, {
                    menuname: fields.menuname,
                    price: fields.price,
                    description: fields.description,
                    picture: files.picture.path.split('public')[1],
                    taste: fields.taste,
                    status: fields.status,
                    remarks: fields.remarks,
                })
                // 修改后重定向
            res.redirect('/admin/menu/menu-show')


        })
    }




}