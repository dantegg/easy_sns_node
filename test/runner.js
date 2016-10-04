/**
 * Created by dantegg on 16/9/28.
 */
module.exports = function runTests(fns,done) {
    var index = 0
    function next(err) {
        if(err){
            return done(err)
        }
        if(index>=fns.length){
            return done()
        }
        console.log('index',index,fns[index].name)
        fns[index++](next)
    }
    next()
}