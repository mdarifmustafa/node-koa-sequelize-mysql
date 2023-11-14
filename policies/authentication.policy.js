const JwtService = require('../services/jwt.service')

module.exports = async (ctx, next) => {

  if (ctx.req.headers && ctx.req.headers.authorization) {
    var token = ctx.req.headers.authorization
  } else {
    ctx.throw(404, 'please login, authentication failed!')
  }

  const decodedToken = JwtService.verify(token)

  const user = await ctx.db.User.findOne({
    where: {
      id: decodedToken.payload.user
    }
  })

  if (user) {
    ctx.state.user = user.id

    await next()
  } else {
    ctx.throw(401, 'Unauthorized!')
  }

}