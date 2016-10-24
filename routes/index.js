const models = require('../models')
const router = require('koa-router')()
const Auth = require('./auth')
const User = require("./user")

exports.router = router

router.use('/auth',Auth.routes(),Auth.allowedMethods())
router.use('/user',User.routes().User.allowedMethods())


router.get('/',async (ctx)=>{
  //ctx.body = 'hello world'
  const isLogin = !!ctx.session.uesrId
  await ctx.render(isLogin?'home':'welcome')
})


router.post('/test',async(ctx)=>{
  ctx.body = {
    foo:'bar',
    headers:ctx.headers,
    postBody:ctx.request.body
  }
})

router.get('/session/get', async(ctx)=>{
  ctx.body = ctx.session
})

router.post('/my/avatar',require('./upload'))

router.get('/session/set', async(ctx)=> {
  ctx.session.foo = 'bar'
  ctx.session.time = Date.now()
  ctx.body = ctx.session
})
router.get('/session/reset',async(ctx)=>{
  ctx.session = null
  ctx.body = 'reseted'
})