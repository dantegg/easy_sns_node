const qs = require('querystring')
const send = require('../utils/send')
const parseBody = require('../utils/parseBody')
exports.login = function(req,res){
  parseBody(req,function(err,body){
    if(err){
      send.sendError(err,res)
      return
    }
    send.redirect('/',res)
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
    send.redirect('/',res)
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
