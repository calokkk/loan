// common JS规范 （node）
// exports等同于module.exports
// 导出
var a = 1;
var func = function () { }
exports.a = a
exports.f = func

// 导入
import a from require('***.js')
import { a, f } from require('***.js')//使用解构


// ES6规范
// 写法一
export var m = 1;

// 写法二
var m = 1;
export { m };

// 写法三
var n = 1;
export { n as m };

//导入 
import { m } from '***.js'

//每个模块最多只有一个
export default {

}

//导入
import a from '***.js'