// 引入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async(req, res) => {

    //标识 标识当前访问的是用户管理页面，点亮图标(保存一个本地变量)
    req.app.locals.currentLink = 'user';


    //接收客户端传来的获得当前页码,也为了实现跳转页面准备号参数
    let page = req.query.page || 1;
    //每一页的数据条数
    let pagesize = 5;
    //查询用户数据总数
    let count = await User.countDocuments({});
    //计算总页数 向上取整
    let total = Math.ceil(count / pagesize);
    //计算当前页面需要显示的第一个数据 如第一页第一个数据是0,第二页第一个数据是10
    let start = (page - 1) * pagesize;
    //每页开始序列号
    let sequenceNub = start + 1;

    //查找数据库所有文档传给渲染页面
    const users = await User.find({}).limit(pagesize).skip(start);


    // 引入art
    res.render('admin/user-show', {
        users,
        total,
        page,
        count,
        sequenceNub
    });
};