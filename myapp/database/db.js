const conn = require('./config')
const connection = conn()
const query = (sql, callback) => {
    console.log(sql);
    connection.query(sql, (err, row, fields) => {
        //查询出错，错误信息抛出
        if (err) {
            callback(err.sqlMessage);
            return;
        }
        var string = JSON.stringify(row);
        var data = JSON.parse(string);
        callback(data)
        return
    })
}

//查询所有数据
const selectAll = (obj, callback) => {
    let { table, currentPage, size } = obj
    let sql = `select * from ${table} order by id limit ${(currentPage - 1) * size},${size}`
    query(sql, callback)
}

//按条件查找数据
const selectOne = async (table, datas, callback) => {
    //遍历datas，组合条件语句
    let condition = ''
    for (var k in datas) {
        condition += `${k}='${datas[k]}' and `
    }
    condition = condition.slice(0, -4)//删除最后一个元素附带的 ‘and’
    let sql = `select * from ${table} where ${condition} order by id desc`
    query(sql, callback)
}

//插入单条数据
const insertOne = (table, datas, callback) => {
    let fields = ''//列名
    let values = ''//值
    for (var k in datas) {
        fields += k + ',';
        values = values + "'" + datas[k] + "',";
    }
    fields = fields.slice(0, -1);
    values = values.slice(0, -1);
    let sql = "INSERT INTO " + table + '(' + fields + ') VALUES(' + values + ')';
    query(sql, callback)
}
//更新单条数据
const updateOne = (table, datas, conditions, callback) => {
    let kv = '';//更新的值 key=value
    let condition = '';
    //组合要更新的值
    for (var k in datas) {
        kv += `${k}="${datas[k]}",`
    }
    //遍历datas，组合条件语句
    for (var k in conditions) {
        condition += `${k}='${datas[k]}' and `
    }
    condition = condition.slice(0, -4)//删除最后一个元素附带的 ‘and’`
    kv = kv.slice(0, -1)
    let sql = `update ${table} set ${kv} where ${condition}`
    query(sql, callback)
}

//删除单条数据
const deleteOne = (table, conditions, callback) => {
    let condition = '';
    // 遍历conditions，组合条件语句
    for (var k in conditions) {
        condition += `${k}='${conditions[k]}' and `
    }
    condition = condition.slice(0, -4)//删除最后一个元素附带的 ‘and’`
    let sql = `delete from ${table} where ${condition}`
    query(sql, callback)
}

const getCount = (table, conditions, callback) => {
    let condition = '';
    let sql=''
    // 遍历conditions，组合条件语句
    if (conditions != null) {
        for (var k in conditions) {
            condition += `${k}='${conditions[k]}' and `
        }
        condition = condition.slice(0, -4)//删除最后一个元素附带的 ‘and’`
        sql = `select count(*) as total from ${table} where ${condition}`
    }
    sql=`select count(*) as total from ${table}` 
    query(sql,callback)
}

exports.selectAll = selectAll
exports.selectOne = selectOne
exports.insertOne = insertOne
exports.updateOne = updateOne
exports.getCount = getCount
