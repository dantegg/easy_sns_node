/**
 * Created by dantegg on 2016/10/25.
 */
const router = module.exports = require('koa-router')()
const models = require("../services")


//当前用户信息
router.get('/',async (ctx)=>{
    const userId = ctx.session.userId
    const user = await models.user.getCache(userId)
    ctx.body = user||{}
})