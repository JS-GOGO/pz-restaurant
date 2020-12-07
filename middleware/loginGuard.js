const session = require("express-session");
const { get } = require("../router/admin");

const guard = (req, res, next) => {
    //判断用户是不是输入admin（一级路由）后面跟的是不是login，不是则跳转到login
    // 而且判断是不是登录状态（session有没有存到username），不是就没有权力访问其它页面，且自动跳回登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        next();
    }
}
module.exports = guard;