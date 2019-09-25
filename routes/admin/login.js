let router = require('koa-router')()

let tools = require('../../model/tools.js')
const DB = require('../../model/db.js')
const Redis = require('../../model/redis.js')
const jwt = require('jwt-simple')
let svgCaptcha = require('svg-captcha')

router.post('/doLogin', async (ctx) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let code = ctx.request.body.code
  // 验证用户名密码是否合法
  if (!code || code !== ctx.session.code) {
    ctx.fail('验证码错误或者为空', 0)
    return false
  }
  // 取数据库匹配
  let result = await DB.find('admin', {'username': username, 'password': tools.md5(password)})
  if (result.length) {
    var token = jwt.encode(result[0], 'yqh')
    ctx.session.userinfo = token
    await Redis.set(token, 1)
    ctx.success({token: token})
  } else {
    ctx.fail('账号密码错误，请重新登陆')
  }
})

router.get('/code', async (ctx) => {
  let captcha = svgCaptcha.createMathExpr({
    // size: 6,
    // fontSize: 50,
    width: 100,
    background: '#ffffff',
    height: 40
  })
  ctx.session.code = captcha.text;
  ctx.sendData(captcha.data, 'image/svg+xml');
  // ctx.sendData(captcha.data);
  // ctx.body = captcha.data
})
module.exports = router.routes()
