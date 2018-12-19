// 关于文章数据库的操作
// 导入数据库对象
const connection = require('../config/db_config');
// 查找全部文章-倒序
exports.findAll = (callback) =>{
  // 查询sql语句 导出方法给c使用
  const sql = 'SELECT * FROM `topics` ORDER BY id DESC'
  connection.query(sql,(err,data)=>{
    if(err) {
      return callback(err,null)
    };
    callback(null,data)
  })
}

// 发起、添加文章
exports.add = (body,callback)=>{
  //拼接sql语句 
  const sql = 'INSERT INTO `topics` SET ?';
  connection.query(sql,body,(err,data)=>{
    if(err) {
      return callback(err);
    }
    callback (null,data)
  })
}

//根据id查询文章
exports.findTopicById = (topicId,callback) => {
  const sql = 'SELECT *FROM `topics` WHERE id=?';
  connection.query(sql,topicId,(err,data)=>{
    if(err){
      return callback(err)
    }
    callback (null,data)
  })
}

// 根据id删除文章
exports.deleteTopicById= (topicID,callback) =>{
  const sql = 'DELETE FROM `topics` WHERE id=?';
  connection.query(sql,topicID,(err,data)=>{
    if(err){
      return callback(err)
    }
    callback(null,data)
  })
}

// 根据id,编辑、更新文章信息
exports.updataEditTopic = (topicID,body,callback) =>{
  const sql = 'UPDATE `topics` SET ? WHERE id = ?';
  connection.query(sql,[body,topicID],(err,data)=>{
    if(err){
      return callback(err)
    }
    callback(null,data)
  })
}