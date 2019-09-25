function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, type) {
      ctx.type = type || option.type || 'json'
      ctx.body = {
        code: option.successCode || 1,
        message: option.successMsg || 'success',
        data: data
      }
    }
    ctx.sendData = function (data, type) {
      ctx.response.type = type || option.type || 'json'
      ctx.body = data
    }
    ctx.fail = function (msg, code) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 0,
        message: msg || option.successMsg || 'fail',
      }
    }
    await next()
  }
}

module.exports = routerResponse
