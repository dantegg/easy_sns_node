//const qs = require('querystring')
const send = require('../utils/send')
const parseBody = require('../utils/parseBody')
const models = require('../models')
const crypto = require('crypto') //加密模块


function  generateToken(userId,callback) {
  var token = crypto.randomBytes(16).toString('hex')
  models.token.update(token,userId,function (err) {
    if(err){
      return callback(err)
    }
    callback(null,token)
  })
}

function doLogin(userId,res) {
  generateToken(userId,function (err,token) {
    //通过Cookie发送token并跳转
    if(err){
      return send.sendError(err,res)
    }
    res.writeHead(302,{
      'Set-Cookie':'token=' + token + ';path=/;HttpOnly',
      location:'/'
    })
    res.end()
  })
}

exports.login = function(req,res){
  parseBody(req,function(err,body){
    if(err){
      send.sendError(err,res)
      return
    }
    models.user.getByEmail(body.email,function (err,user) {
      if(err){
        return send.sendError(err,res)
      }
      if(!user){
        return send.redirect('/?err=no_user',res)
      }
      if(body.password !== user.password){
        return send.redirect('/?err=invalid_pass',res)
      }
      doLogin(user.id,res)
      //send.redirect('/',res)
    })

  })
  //res.end('login')
}

exports.register = function(req,res){
  //var body = req.body
  //console.log(body)
  parseBody(req,function(err,body){
    if(err){
      send.sendError(err,res)
      return
    }
    var user = {
      email:body.email,
      password:body.password,
      nickname:body.nickname
    }
    models.user.create(user,function (err) {
      if(err){
        return send.sendError(err,res)
      }
      doLogin(user.id,res)
      //send.redirect('/',res)
    })

  })
  // var buffers = []
  // req.on('data',function(data){
  //   buffers.push(data)
  // })
  // req.on('end',function(){
  //   var rawBody = Buffer.concat(buffers).toString('utf8')
  //   var body = qs.parse(rawBody)
  //   console.log('body',body)
  //   var user = {
  //     email:body.email,
  //     password:body.password,
  //     nickname:body.nickname
  //   }
  //   res.writeHead(302,{
  //     location:'/'
  //   })
  //   res.end('register')
  // })
}
