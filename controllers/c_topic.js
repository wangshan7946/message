const moment = require('moment');
// 需要一个文章列表展示==获取数据库中的数据  使用m_topic文件中的数据
const M_topic = require('../models/m_topic')
exports.showTopic = (req,res)=>{
  M_topic.findAll((err,data)=>{
    if(err){
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    // 此时是正确。返回数据库查询的数据==数组=
    // 使用模板引擎渲染index页面items
    res.render('index.html',{
      items:data,
      user:req.session.user
    })
  })
}

//发布文章页面
exports.showCreateTopic =(req,res)=>{
 res.render('topic/create.html',{
  user:req.session.user
 })
}

// 获取文章添加的表单数据，处理放入数据库中
exports.handleCreateTopic = (req,res) =>{
  const body = req.body;
  // 创建时间
  body.createdAt = moment().format();
  // 区分文章的创建者 =当前登录用户的id(数据库中查的)
  body.userId = req.session.user.id;
  M_topic.add(body,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    // 此处插入数据成功
    res.send({
      code:200,
      mes:'文章添加成功'
    })
  })
}

// 渲染文章详情页
exports.showTopicDetail = (req,res) => {
  //获取当前动态路由参数topicID  req.params
  const topicID = req.params.topicID;
  //渲染视图v-show
  // 根据动态id查询数据---M
  M_topic.findTopicById(topicID,(err,data)=>{
    if(err) {
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    //当数组为空查不到数据的时候，不需要返回响应
    // 使用数据--然后获取到数组，去页面模板引擎
    // 判断编辑.删除按钮的隐藏（发表与登录用户一致）
    res.render('topic/show.html',{
      topic:data[0],
      // 登录的用户id  req.session.user.id
      loginID :req.session.user.id
    })
  })
}

// 删除话题
exports.deleteTopic = (req,res)=>{
  const topicID = req.params.topicID;
  // 根据id去删除数据 ==M
  M_topic.deleteTopicById(topicID,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    // res.send({
    //   code:200,
    //   mes:'删除成功'
    // })
    res.redirect('/')
  })
}


// 点击编辑按钮，先去渲染编辑页面
// 编辑话题
exports.editTopic =(req,res) => {
  // 获取动态id--和路由的形参名对应
  const topicID = req.params.topicID;
  console.log(topicID)
  // 根据id去数据库查找数据
  M_topic.findTopicById(topicID,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    //此处是已经查询到数据，展示到页面中
    res.render('topic/edit.html',{
      topic:data[0]
    })
  })
}

// 提交按钮，获取到的表单数据插入数据库中
exports.updataEditTopic= (req,res) =>{
  // 先拿到id和表单数据
  const body = req.body;
  const topicID = req.params.topicID;
  console.log(body,topicID)
  // 根据id去更新数据库
  M_topic.updataEditTopic(topicID,body,(err,data)=>{
    console.log(err)
    if(err){
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    // 此处是更新成功，但是服务端不能重定向，返回200响应
    res.send({
      code:200,
      mes:'话题编辑成功'
    })
  })
}
