let db = require('../database/db')
//【查询】用户填写的基本资料表单
let getUserInfoForm = (username) => {
    return new Promise((resolve, reject) => {
        db.selectOne('form', { username: username }, data => {
            if (data[0]) {
                //基本信息存在数据库中
                resolve(data[0])
            }
            resolve()
        })
    })
}
//【更新】用户填写的基本资料表单
let updateUserInfoFrom = (info) => {
    return new Promise((resolve, reject) => {
        db.updateOne('form', info, { username: info.username }, data => {
            if (data.affectedRows) {
                resolve('ok')
            }
            resolve()
        })
    })
}
//【插入】用户填写的基本资料表单
let insertUserInfo = (info) => {
    return new Promise((resolve, reject) => {
        db.insertOne('form', info, (data) => {
            if (data.insertId) {
                resolve('ok')
            }
            resolve()
        })
    })
}
//【查询】贷款记录
let getLoanRecord = (username) => {
    return new Promise((resolve, reject) => {
        db.selectOne('loanrecord', { username: username }, (data) => {
            if (data) {
                resolve(data)
            } else {
                resolve()
            }
        })
    })
}
// 更新用户存在的贷款记录
let updateLoanRecord = (info) => {
    return new Promise((resolve, reject) => {
        db.updateOne('loanrecord', info, { username: info.username, id: info.id }, data => {
            if (data.affectedRows) {
                resolve('ok')
            }
        })
    })
}

//插入贷款记录
let insertLoanRecord = (info) => {
    return new Promise((resolve, reject) => {
        db.insertOne('loanrecord', info, data => {
            if (data.insertId) {
                resolve('ok')
            }
            resolve()
        })
    })
}

//查询所有用户的基本信息
let getUserInfoList = (info) => {
    return new Promise((resolve, reject) => {
        db.selectAll(info, data => {
            resolve(data)
        })
    })
}
// 获取总条数
let getCount = (table) => {
    return new Promise((resolve, reject) => {
        db.getCount(table, null, data => {
            resolve(data[0].total)
        })
    })
}

module.exports = {
    getUserInfoForm,//获取 用户基本信息表单
    updateUserInfoFrom,//更新 用户基本信息表单
    insertUserInfo,//插入 用户基本信息表单
    getLoanRecord,//获取 贷款记录
    updateLoanRecord,//更新 贷款记录
    insertLoanRecord,//插入 贷款记录
    /* cms相关接口 */
    getUserInfoList,//获取 用户基本信息列表
    getCount//查询 数据总条数
}