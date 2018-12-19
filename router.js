// 路由配置

// 导包
const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');


// 实例化router
const router = express.Router()

//配置路由，找方法--去函数功能文件夹
router
.get('/signin',c_user.showSignin)
//监听表单提交的请求
.post('/signin',c_user.showCheck)
.get('/',c_topic.showTopic)
.get('/topic/create',c_topic.showCreateTopic)
.post('/createTopic',c_topic.handleCreateTopic)
.get('/signout',c_user.handleSignout)

// 固定的 ==》需要改成动态id
// .get('/detail/topic',c_topic.showTopicDetail)
// 动态标识：开头+形参名--找c方法
.get('/detail/topic/:topicID',c_topic.showTopicDetail)
.get('/topic/:topicID/delete',c_topic.deleteTopic)
.get('/topic/:topicID/edit',c_topic.editTopic)
.post('/edit/topic/:topicID',c_topic.updataEditTopic)
.get('/signup',c_user.showSignup)
.post('/signup',c_user.addUser)



// 导出路由对象
module.exports = router;