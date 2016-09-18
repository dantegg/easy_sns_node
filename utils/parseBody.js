const qs = require('querystring')
const getRawBody = require('./getRawBody')

module.exports = function(req,callback){
  getRawBody(req,function(err,rawBody){
    var type = req.headers['content-type']||''
    type = type.split(';')[0]
    if(type === 'application/x-www-form-urlencoded'){
      var body = qs.parse(rawBody)
      callback(null,body)
      return
    }
    callback()
  })
}
