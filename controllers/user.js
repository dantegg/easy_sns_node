const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = require('../models')
const joinPath = require('path').join
const multiparty = require('multiparty')


exports.user = function(req,res){
    models.user.get(req.userId,function (err,user) {
      console.log('user',user)
      if(err){
        return send.sendError(err,res)
      }
      res.end(JSON.stringify(user))
    })
}
 // res.end('user')

const  uploadDir = joinPath(__dirname,'../data/upload')

exports.myavatar = function(req,res){
    console.log(uploadDir)
    if(!req.userId){
        return send.sendError(new Error('not_login'),res)
    }
    var form = new multiparty.Form({
        uploadDir: uploadDir
    })
    //console.log(form)
    form.parse(req,function (err,fields,files) {
        //console.log('222')
        if(err){
            return send.sendError(err,res)
        }
        console.log('files',files)
        var newPath = files.file[0].path.replace(uploadDir,'')
        console.log('newPath',newPath)
        var url = 'http://localhost:3000/upload'+newPath
        models.user.updatePart(req.userId,{avatar:url},
            function (err,info) {
            if(err){
                send.sendError(err,res)
            }
            res.end(JSON.stringify({
                avatar:url
            }))
            })
    })
}