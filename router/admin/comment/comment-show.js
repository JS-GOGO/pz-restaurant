const { Comment } = require('../../../model/comment');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //标识 标识当前访问的是用户管理页面，点亮图标
    req.app.locals.currentLink = 'comment';



    //接收客户端传来的获得当前页码,也为了实现跳转页面准备号参数
    // let page = req.query.page || 1;
    // //每一页的数据条数
    // let pagesize = 5;
    // //查询用户数据总数
    // let count = await Comment.countDocuments({});
    // //计算总页数 向上取整
    // let total = Math.ceil(count / pagesize);
    // //计算当前页面需要显示的第一个数据 如第一页第一个数据是0,第二页第一个数据是10
    // let start = (page - 1) * pagesize;
    // //每页开始序列号
    // let sequenceNub = start + 1;
    //查找数据库所有文档传给渲染页面
    // const comments = await Comment.find({}).limit(pagesize).skip(start).populate(['uid', 'cid', 'mid']);




    //关联多个集合时，（populate内使用数组）render传递不了值
    let page = req.query.page || 1;
    let size = 5

    let comments = await pagination(Comment).find({}).page(page).size(size).populate(['uid', 'cid', 'mid']).exec();
    let comentsStr = JSON.stringify(comments)

    //问题：1.使用populate关联集合时，render传值出现问题原因可能是render不能传递多层嵌套（比如数组内有对象，对象内又有对象）
    //      2.参考blog为什么能够传值（不过就算能传值也只是关联一个集合，这里关联3个，可能不一样）*没有得到结果，我更改了blog的文件没有对网页访问造成影响*
    //      3.解决方法：只能遍历comments，将这个数组内的对象遍历出来*过于复杂*
    // 最终解决方案：将得到的对象转化为Json字符串，在转化为Json对象，即可传递
    let comentsJson = JSON.parse(comentsStr)
    console.log(comentsJson);
    let sequenceNub = (page - 1) * size + 1;



    res.render('admin/comment/comment-show', {
        comentsJson, //普通populate联合查询的值传不过去
        sequenceNub
    })

};