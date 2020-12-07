//引入数据库文件
const mongose = require('mongoose');

//创建评论集合规则
const commentSchame = new mongose.Schema({
    //关联发表评论用户
    uid: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cid: {
        //关联包间
        type: mongose.Schema.Types.ObjectId,
        //这里大写会出错
        ref: 'compartment'
    },

    mid: {
        //关联菜单
        type: mongose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    // 评论时间
    time: {
        type: Date,
        default: new Date()
    },
    //评论内容
    content: {
        type: String
    }
})

//创建集合构造函数
const Comment = mongose.model('Comment', commentSchame);
//插入一个评论，要是数据都删完了可以来这里添加
async function createComment() {
    const comment = await Comment.create({
        uid: '5fba8c9cac64fb5e84293a16',
        cid: '5fbf5697189389367839bbd5',
        mid: '5fbf62baa9b6e33e5ccbea30',
        content: '我是评论测试，这道菜很好吃',


    });
    console.log('评论创建成功');
}
// 打开这里,运行一遍app.js后关掉,就可以得到一个密码为123456的用户,如果是删除了数据库,注意数据库连接
// createComment();
// 联合查询
// Comment.find().populate(['uid', 'cid', 'mid']).then(result  =>  console.log(result));
module.exports = {
    Comment
}