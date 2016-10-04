/**
 * Created by dantegg on 16/9/30.
 */
exports.parse = function (cookie) {
    var result = {}
    cookie.split(';').map(function (kv) {
        var pair = kv.trim().split('=')
        result[pair[0]]=pair[1]
    })
    return result
}