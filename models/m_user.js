// 关于用户数据库的操作
// 导入数据库对象
const connection = require('../config/db_config');

// 导出一个模块，给c_user使用 
// checkEmail方法有两个参数 
// email为数据，callback为数据库执行的结果
exports.checkEmail = (email,callback)=> {
  const sql = 'SELECT * FROM `users` WHERE email=?';
  connection.query(sql,email,(err,data)=>{
    if(err){
      return callback(err,null)
    }
    callback(null,data)
  })
}
exports.checkNickname = (nickname,callback)=> {
  const sql = 'SELECT * FROM `users` WHERE nickname=?';
  connection.query(sql,nickname,(err,data)=>{
    if(err){
      return callback(err)
    }
    callback(null,data)
  })
}

exports.addUsers = (body,callback)=>{
  const sql = 'INSERT INTO  `users` SET ?';
  connection.query(sql,body,(err,data)=>{
    if(err){
      return callback(err)
    }
    callback(null,data)
  })
}