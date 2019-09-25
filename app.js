//引入 koa模块
var Koa = require('koa'),
  router = require('koa-router')(),
  session = require('koa-session'),
  bodyParser = require('koa-bodyparser'),
  routerResponse = require('./model/routerResponese'),
  static = require('koa-static');

//实例化
var app = new Koa();



// koa-session
app.keys = ['some secret hurr'];

var CONFIG = {
  key: 'koa:sess',
  maxAge: 864000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false, //每次请求重新设置session
  renew: false,
};

app.use(session(CONFIG, app));


app.use(bodyParser())
app.use(routerResponse())
//配置 静态资源的中间件
app.use(static(__dirname + '/public'));

//引入模块
var index = require('./routes/index.js');
var api = require('./routes/api.js');
var admin = require('./routes/admin.js');

router.use('/admin', admin);
router.use('/api', api);
router.use(index);

app.use(router.routes());
/*启动路由*/
app.use(router.allowedMethods());

app.listen(2019);







