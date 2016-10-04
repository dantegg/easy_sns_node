/**
 * Created by dantegg on 16/9/29.
 */
module.exports = function (req,res) {
    console.log('Cookie',req.headers.cookie)
    res.writeHead(200,{
        'Set-Cookie':'foo=bar;HttpOnly'
    })
    res.end()
}