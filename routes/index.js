const models = require('../models')
const router = require('koa-router')()

exports.router = router

router.get('/',async (ctx)=>{
  ctx.body = 'hello world'
  const isLogin = false
  await ctx.render(isLogin?'home':'welcome')
})

router.post('/register',async(ctx)=>{
  const body = ctx.request.body
  const user = {
    email:body.email,
    password:body.password,
    nickname:body.nickname
  }
  const id = await models.user.create(user)
  ctx.session.userId = id
  ctx.redirect('/')

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

router.get('/session/set', async(ctx)=> {
  ctx.session.foo = 'bar'
  ctx.session.time = Date.now()
  ctx.body = ctx.session
})
router.get('/session/reset',async(ctx)=>{
  ctx.session = null
  ctx.body = 'reseted'
})