var router = require('koa-router')()
const Redis = require('../../model/redis.js')
let jwt = require('jwt-simple')
let Config = require('../../model/config')

router.get('/', async (ctx) => {
  ctx.success({userInfo: jwt.decode(ctx.session.userinfo, Config.jwtSecret)})
})


router.post('/register', async (ctx) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let code = ctx.request.body.code
  // 验证用户名密码是否合法
  if (!code || code !== ctx.session.code) {
    ctx.fail('验证码错误或者为空', 0)
    return false
  }
  // 取数据库匹配
  let result = await DB.find('admin', {'username': username})
  if (result.length) {
    ctx.fail('用户名已存在，请重新输入', 0)
  } else {
    await DB.insert('admin', {'username': username, 'password': password})
    ctx.success()
  }
})

router.get('/edit', async (ctx) => {
  // ctx.body='编辑管理'
})

router.get('/delete', async (ctx) => {
  // ctx.body='删除管理'
})

module.exports = router.routes()
