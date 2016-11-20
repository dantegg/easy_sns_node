/**
 * Created by dantegg on 2016/10/25.
 */

const models = require('../models')
const router = require('koa-router')()

module.exports = router


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

router.post('/login',async (ctx)=>{
    const body = ctx.request.body
    const user = await models.user.getByEmail(body.email)
    console.log('user is ',user)
    if(!user){
        ctx.redirect('/?err=no_user')
        return
    }
    if(body.password !== user.password){
        ctx.redirect('/?err=invalid_pass')
        return
    }
    ctx.session.userId = user._id
    console.log('login success')
    ctx.redirect('/')
})

router.get('/logout',async (ctx)=>{
    ctx.session = null
    ctx.redirect('/')
})

