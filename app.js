//入口
// 1.导包 
const express = require('express');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);



// 2.配置express增加render方法
app.engine('html', require('express-art-template'));
// 配置body-parser 增加获取表单数据的方法req.body
app.use(bodyParser.urlencoded({extended: false}));
// 配置express-session和express-mysql-session
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'mes'
};
var sessionStore = new MySQLStore(options);
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// 公开静态资源public文件夹
app.use('/public',express.static('./public'));
// 公开第三方node_medules文件夹
app.use('/node_modules',express.static('./node_modules'));




// 3.监听请求配置路由===使用路由
app.use(router);
// 4.监听端口
app.listen('999',()=>{
  console.log('localhost:999')
})