let router = require('koa-router')();
let login = require('./admin/login');
let url = require('url');
let user = require('./admin/user');


let whiteList = [
  '/admin/login',
  '/admin/login/doLogin',
  '/admin/login/code',
]
router.use(async (ctx, next) => {
  // 权限判断
  if (ctx.session.userinfo) {
    await next()
  } else {
    if (whiteList.indexOf(url.parse(ctx.url).pathname) >= 0) {
      await next()
    } else {
      ctx.fail('您没有相应权限', 0)
    }
  }
})

router.use('/login', login);
router.use('/user', user);


module.exports = router.routes()
