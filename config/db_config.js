// 导入数据库的包
const mysql = require('mysql');
// 配置数据库的包
var connection = mysql.createConnection({
  host : 'localhost',
  user:'root',
  password :'root',
  database :'mes' 
})
//连接数据了
connection.connect();
// 导出对象
module.exports = connection;