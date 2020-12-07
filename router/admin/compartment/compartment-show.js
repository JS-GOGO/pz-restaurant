const menu = require('../../../model/menu');
const { Compartment } = require('./../../../model/compartment')

module.exports = async(req, res) => {
    //标识 标识当前访问的是用户管理页面，点亮图标
    req.app.locals.currentLink = 'compartment';

    //接收客户端传来的获得当前页码,也为了实现跳转页面准备号参数
    let page = req.query.page || 1;
    //每一页的数据条数
    let pagesize = 5;
    //查询用户数据总数
    let count = await Compartment.countDocuments({});
    //计算总页数 向上取整
    let total = Math.ceil(count / pagesize);
    //计算当前页面需要显示的第一个数据 如第一页第一个数据是0,第二页第一个数据是10
    let start = (page - 1) * pagesize;
    //每页开始序列号
    let sequenceNub = start + 1;



    //查找数据库所有文档传给渲染页面
    const compartments = await Compartment.find({}).limit(pagesize).skip(start);
    // let sequence = 0;
    // sequence++;
    res.render('admin/compartment/compartment-show', {
        compartments,
        total,
        page,
        count,
        sequenceNub
    })
}