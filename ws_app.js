/**
 * Created by dantegg on 2016/11/5.
 */
const co = require('co')
const ws = require('ws')
const Cookies = require('cookies')
const wsManager = require('./servers').wsManager

module.exports = (httpServer,sessionStore,keys)=>{
    const wss = ws.createServer({
        server:httpServer
    })
    wss.on('connection',(ws)=>{
        const cookies = new Cookies(ws.upgradeReq,null,{
            keys:keys
        })
        console.log('upgradeReq',ws.upgradeReq)
        const sid = cookies.get('koa.sid')
        console.log('sid',sid)
        co(sessionStore.get('koa:sess:'+sid)).then(session=>{

            const userId = session.userId
            console.log('userId',userId)
            ws.userId = userId
            wsManager.put(userId,ws)
        }).catch(err=>{
            console.log(err)
        })
    })
}