var express = require('express');
var router = express.Router();
let db = require('../database/db.js')
let http = require('http')
let axios = require('axios')
let api = require('../api/api.js')
/* GET users listing. */

router.get('/', async function (req, res, next) {
  res.send('this is users route')
})
//登录注册接口
router.post('/login', function (req, res, next) {
  console.log('=======login=======');
  let userInfo = req.body.userInfo
  db.selectOne('users', userInfo, (data) => {
    if (data[0]) {
      //用户名存在    
      res.cookie('userInfo', JSON.stringify({ uid: data[0].id, username: data[0].username }), { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) })
      res.send({
        code: 200,
        msg: '登录成功'
      })
    } else {
      //用户名或者密码错误
      res.send({
        code: 404,
        msg: '用户名或者密码错误'
      })
    }
  })

});
//退出登录
router.post('/logout', function (req, res, next) {
  console.log('=======logout=======');
  res.clearCookie('userInfo')
  res.send({
    code: 200,
    data: '退出成功'
  })
})

//提交基本信息
router.post('/submitUserInfo', function (req, res, next) {
  console.log('=======submitUserInfo=======');
  let info = req.body.form
  let result = {
    code: 200,
    data: '提交成功'
  }
  let err = {
    code: 404,
    data: '提交出错'
  }
  // 提交  查询是否存在该用户填写的表单
  // 有则update, 无则insert
  api.getUserInfoForm(info.username).then(data1 => {
    // 查询是否存在
    if (data1) {
      api.updateUserInfoFrom(info).then(data2 => {
        if (data2) {
          res.send(result)
        } else {
          res.send(err)
        }
      })
    } else {
      //不存在则插入
      api.insertUserInfo(info).then(data3 => {
        if (data3) {
          res.send(result)
        } else {
          res.send(err)
        }
      })
    }
  })
})
//进入页面   查询是否存在该用户填写的表单
// 有则绑定到前端表单
router.post('/initForm', (req, res, next) => {
  console.log('=======initForm=======');
  let username = req.body.username
  api.getUserInfoForm(username).then(data => {
    // 查询到填写过的基本资料表单
    if (data) {
      res.send({
        code: 200,
        data: data
      })
    } else {
      res.send({
        code: 404,
        data: {
          data: {}
        }
      })
    }
  })
})

//信息填写完整度
router.post('/dataProcess', (req, res, next) => {
  console.log('=======dataProcess=======');
  let username = req.body.username
  let step = []//存储进度 填写完成为1，未填写为0
  let money = '';
  api.getUserInfoForm(username).then(data1 => {
    step[0] = data1 ? 1 : 0
    api.getLoanRecord(username).then(data2 => {
      // 筛选出未审核完成的记录
      let result = data2.filter(item => {
        return item.state == 0 || item.state == 1
      })
      step[1] = result[0] ? 1 : 0
      money = result[0] ? result[0].money : ''
      res.send({
        code: 200,
        data: {
          step,//资料完成进度
          money//贷款金额
        }
      })
    })
  })

})

//金额及分期时间提交
router.post('/submitLoanInfo', (req, res, next) => {
  console.log('=======submitLoanInfo=======');
  let info = req.body.form
  let result = {
    code: 200,
    data: '提交成功'
  }
  let err = {
    code: 404,
    data: '提交出错'
  }
  api.getLoanRecord(info.username).then(data1 => {
    // 查询数据库是否存在该用户的贷款记录
    let arr = data1.filter(item => {
      return item.state == 0 || item.state == 1
    })
    if (arr[0]) {
      // 存在
      api.updateLoanRecord(info).then(data2 => {
        if (data2) {
          res.send(result)
        } else {
          res.end(err)
        }
      })
    } else {
      // 不存在
      delete info.id //删除id，再进行插入，否则会主键冲突
      api.insertLoanRecord(info).then(data3 => {
        if (data3) {
          res.send(result)
        } else {
          res.send(err)
        }
      })
    }
  })
})

//初始化贷款表单
router.post('/initLoanForm', (req, res, next) => {
  //当前贷款记录是否已经完成，是的话返回新的
  console.log('=======initLoanForm=======');
  let username = req.body.username
  api.getLoanRecord(username).then(data => {
    let arr = data.filter(item => {
      return item.state == 0 || item.state == 1
    })
    res.send({
      code: 200,
      data: arr[0] ? arr[0] : { money: '2000', qishu: '12期' }
    })
  })
})

//贷款记录
router.post('/loanRecord', (req, res, next) => {
  console.log('=======loanRecord=======');
  let username = req.body.username
  db.selectOne('loanrecord', { username: username }, data => {
    res.send({
      code: 200,
      data: data ? data : {}
    })
  })
})

router.post('/updateRecordState', async (req, res, next) => {
  let record = req.body.info
  console.log(record);
  record.state = 1
  let result = await api.updateLoanRecord(record)
  res.send({
    code: 200,
    data: result
  })
})
module.exports = router;
