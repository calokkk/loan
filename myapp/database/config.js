var mysql = require('mysql')
var config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'loan'
}
var connection;
var cnt = 0;


let connectdb = () => {
    connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) throw err;
        console.log('数据库连接成功')
    });

    connection.on('error', err => {
        if (err) {
            // 如果是连接断开，自动重新连接
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                connect();
                cnt++;
                console.log(`数据库重连 ${cnt} 次`);
            } else {
                console.log('db err: ', err);
            }
        }
    })
    return connection
}

module.exports=connectdb