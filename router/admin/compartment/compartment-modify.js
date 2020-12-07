const { Compartment } = require('./../../../model/compartment')


module.exports = async(req, res, next) => {
    const { menu, time, status } = req.body;

    let { id, Cstatus, Change } = req.query;

    // 注意query获取的值是字符串类型
    if (Cstatus == 'true') {
        Cstatus = false
    } else {
        Cstatus = true

    }

    //根据Change判断改状态还是改全部，
    if (Change) { //只更改状态
        await Compartment.updateOne({ _id: id }, {
            status: Cstatus,
        })
        res.redirect('/admin/compartment/compartment-show')
    } else {
        await Compartment.updateOne({ _id: id }, {
            menu,
            time,
            status
        })
        res.redirect('/admin/compartment/compartment-show')
    }

}