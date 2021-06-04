var express = require('express');
var router = express.Router();
let db = require('../database/db.js')
let http = require('http')
let axios = require('axios')
let api = require('../api/api.js')
/* GET users listing. */

router.get('/', async function (req, res, next) {
  res.send('this is cms route')
})
//获取所有用户的基本信息
router.get('/getUserInfoList', async (req, res, next) => {
  console.log('=======getUserInfoList=======');
  let { currentPage, size } = req.query
  let count = await api.getCount('form')
  let result = await api.getUserInfoList({ table: 'form', currentPage, size })
  console.log(count);
  console.log(result);
  
  res.send({
    code: 200,
    data: {
      total: count,
      data: result
    }
  })

});

module.exports = router;
