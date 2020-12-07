const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    const { username, gender, phone, password, email, role } = req.body;

    //网址携带的id,及需要修改的用户名
    const { id } = req.query.id;
    let user = await User.findOne({ _id: id });
    // res.send(body.password)
    //将添加用户验证的错误信息传递到页面  try catch方法，try里可能出错的代码，catch存错误信息
    if (password.trim().length == 0) return next(JSON.stringify({ path: '/admin/user-edit', id: id, message: '请输入密码' }));

    try {
        //使用await是因为Joi.validate返回一个promis对象
        await validateUser(req.body);
    } catch (e) {
        //joi验证发生错误，返回错误信息
        return next(JSON.stringify({ path: '/admin/user-edit', id: id, message: e.message }));
    }

    //修改填写密码和数据库密码比对 compar是个异步函数，返回一个布尔值
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) { // 密码比对成功
        //将修改信息跟新到数据库，注意这里不更改密码，密码只是用来匹对是否正确，正确才能修改信息
        await User.updateOne({ _id: id }, {
                username,
                gender,
                email,
                phone,
                role
            })
            // 修改后重定向到用户列表页面
        res.redirect('/admin/user-show')
    } else {
        //密码比对失败 注意这里错误信息要携带id，因为修改用户页面原本的地址就携带着id,否则会跳转到用户添加页面
        let obj = { path: '/admin/user-edit', id: id, message: '密码比对失败，不能进行信息修改' }
        next(JSON.stringify(obj))
    }
}