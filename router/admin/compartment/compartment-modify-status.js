   const { Compartment } = require('./../../../model/compartment')


   module.exports = async(req, res, next) => {

       //网址携带的id
       const id = req.query.id;
       let ChangStatus = req.query.ChangStatus;
       let status = '';
       //点击包间状态按钮，改变当前包间使用状态
       if (ChangStatus = 'no') {
           status = 'yes'
           console.log(222);
       }
       if (ChangStatus = 'yes') {
           status = 'no'
           console.log(11);
       }

       await Compartment.updateOne({ _id: id }, {
               status
           })
           // 修改后重定向
       res.redirect('/admin/compartment/compartment-show')
   }