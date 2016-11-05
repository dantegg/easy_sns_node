const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const session = require('koa-generic-session')
const redisSessionStore = require('koa-redis')
const logger = require('koa-logger')


const router = require('./routes').router

app.keys=['zzz233']   //设置key做校验，最好是随机字符串


app.use(logger())

app.use(async(ctx,next) =>{
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(mount('/static',require('koa-static')(__dirname+'/public')))
app.use(mount('/upload',require('koa-static')(__dirname+'/data/uploadgit ')))
app.use(bodyparser)
app.use(json())

//old session
// app.use(session({
//   store:redisSessionStore({
//       host:"localhost"
//   })
// }))

//new session
const sessionStore = redisSessionStore({
  //options
})


//进入router之前设置session

app.use(views(__dirname+'/views',{
  extension:'html'
}))

app.use(router.routes(),router.allowedMethods())

app.on('error',function(err,ctx){
  console.log(err)
  logger.error('server error',err,ctx)
})
//old
//app.listen(3000)
//new
const http = require('http')
const server = http.createServer(app.callback())
server.listen(3000)

//init wsapp
require('./ws_app')(server,sessionStore,app.keys)
module.exports = app
