const fs = require('fs')
const mime = require('mime');
const sendFile = require('../utils/send').sendFile
const joinPath = require('path').join
const publicPath = joinPath(__dirname,'../public')

module.exports = function(req,res){
  //console.log('params',req.params)
  var path = req.params[1]
  path = joinPath(publicPath,path)
  sendFile(path,res)
}
