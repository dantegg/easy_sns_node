/**
 * Created by dantegg on 16/9/28.
 */
// const assert = require('assert')
// const MemStore = require('../../store/memstore')
// const BaseModel = require('../../models/base')
// const runner = require('../runner')
//
//
// const store = new MemStore()
// const model = new BaseModel(store,'base:')
// const obj = {foo:'bar'}
//
//
// // runner([testCreate,testGet,testDel],function (err) {
// //     if(!err){
// //         console.log('All done')
// //     }
// // })
//
// describe('BaseModel',function () {
//     it('should create without error',testCreate)
//     it('should get by id',testGet)
//     it('should get nothing after delete',testDel)
// })
//
//
// function testCreate(done) {
//     model.create(obj,function (err) {
//         assert(!err)
//         assert(obj.id)
//         done()
//     })
// }
//
// function testGet(done) {
//     model.get(obj.id,function (err,result) {
//         assert(!err)
//         assert.equal(result.foo,'bar')
//         done()
//     })
// }
//
// function testDel(done) {
//     model.del(obj.id,function (err) {
//         assert(!err)
//         model.get(obj.id,function (err,result) {
//             assert(!err)
//             assert(!result)
//             done()
//         })
//     })
// }


const expect = require('chai').expect
const MemStore = require('../../store/memstore')
const BaseModel = require('../../models/base')

const store = new MemStore()
const model = new BaseModel(store,'base:')

describe('BaseModel',()=>{
    it('should create without error', async () =>{
        const id = await model.create({foo:'bar'})
        expect(id).to.be.ok
    })

    it('should get by id ', async ()=>{
        const id = await model.create({foo:'bar'})
        const result = await model.get(id)
        expect(result).to.be.ok
        expect(result.foo).to.be.equal('bar')
    })
    it('should get nothing after delete', async ()=>{
        const id = await model.create({foo:'bar'})
        await  model.del(id)
        const result = await model.get(id)
        expect(result).not.to.be.ok
    })

})