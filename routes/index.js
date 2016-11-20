
const router = require('koa-router')()
exports.router = router

function useRoute(name) {
  const rt = require(`./${name}`)
  //console.log(name)
  router.use(`/${name}`,rt.routes(),rt.allowedMethods())

}
;['auth','user','users','rel','activities'].forEach(useRoute)

router.get('/',async (ctx)=>{
  const isLogin = !!ctx.session.userId
  console.log('isLogin',isLogin)
  await ctx.render(isLogin? 'home' : 'welcome')
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
