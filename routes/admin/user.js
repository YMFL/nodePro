var router = require('koa-router')()
const Redis = require('../../model/redis.js')
let jwt = require('jwt-simple')

router.get('/', async (ctx) => {
  // let hh = await Redis.get(ctx.session.userinfo)
  ctx.success({userInfo: jwt.decode(ctx.session.userinfo)})
})

router.get('/add', async (ctx) => {
  // ctx.body='增加用户'
  // await ctx.render('admin/user/add')
  // await ctx.render('admin/user/add');
})

router.get('/edit', async (ctx) => {
  // ctx.body='编辑管理'
})

router.get('/delete', async (ctx) => {
  // ctx.body='删除管理'
})

module.exports = router.routes()
