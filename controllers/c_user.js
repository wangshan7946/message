const M_user = require('../models/m_user')
// 使用render方法渲染signin页面
exports.showSignin = (req,res)=>{
  res.render('signin.html')
}

//表单请求功能
exports.showCheck = (req,res) => {
  // 获取表单数据--安装body-parser
  const body = req.body;
  // console.log(body)

  // 在此处操作数据库结果--checkEmail需要两个参数
  // 1 表单数==邮箱
  // 2 回调函数==有两个参数，err=sql语句不对，data查询到的数据
  M_user.checkEmail(body.email,(err,data)=>{
    // 此时报错是服务器的err=sql语句不对
    if(err){
      return res.send({
        code:500,
        msg:'服务器错误'
      })
    }
  //   // 此处是查询结果 1数组为空，邮箱不对 2 数组有数据 邮箱正确
    if(data.length == 0){
      return res.send ({
        code :1,
        mes:'邮箱不存在，请注册'
      })
    }
  //   // 此处2 数组有数据 邮箱正确--验证密码
  //   // 如果获取的表单的密码和数组的不匹配
    if(body.password != data[0].password) {
      return res.send({
        code:2,
        mes :'密码错误，请重新输入'
      })
    }
    // 把用户信息进行保存 
    req.session.user = data[0];
    
    // 此处是密码正确，
    res.send({
      code:200,
      mes :'输入正确'
    })
  })
}

// 处理用户退出
exports.handleSignout = (req,res) => {
  // 清除session 
  delete req.session.user
  // 重定向返回登录页
  res.redirect('/signin')
}

// 渲染注册页 
exports.showSignup = (req,res)=>{
  res.render('signup.html')
}
// 注册用户信息，获取表单数据，（验证邮箱及昵称）添加进数据库
exports.addUser = (req,res)=>{
  const body = req.body;
  console.log(body)
  M_user.checkEmail(body.email,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        mes:'服务器错误'
      })
    }
    // 此处判断邮箱存不存在
    if(data[0]) {
      return res.send({
        code:2,
        mes:'邮箱已存在'
      })
    }
    // 此处邮箱不存在验证昵称
    M_user.checkNickname(body.nickname,(err,data)=>{
      if(err){
        return res.send({
          code:500,
          mes:'服务器错误'
        })
      }
      //此处看昵称[]是否存在
      if(data[0]){
        return res.send({
          code:1,
          mes:'昵称已经存在'
        })
      }
      // 此处昵称不存在，可以注册--把表单数据填写进数据库中
      // res.send({
      //   code:200,
      //   mes:'用户可以注册'
      // })
      M_user.addUsers(body,(err,data)=>{
        if(err){
          return res.send({
            code:500,
            mes:'服务器错误'
          })
        }
        res.send({
          code:200,
          mes:'可以注册了'
        })
      })

    })








  })
}