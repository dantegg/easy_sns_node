/**
 * Created by dantegg on 16/9/30.
 */
const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = require('../models')


function getLoginUserId(req,callback) {
    var c = cookies.parse(req.headers.cookie || '')
    console.log('c',c)
    if(!c.token){
        return callback()
    }
    models.token.get(c.token,callback)
}

module.exports = function authorize(controller) {
    return function (req,res) {
        getLoginUserId(req,function (err,userId) {
            if(err){
                return send.sendError(err,res)
            }
            req.userId = userId
            controller(req,res)
        })
    }
}