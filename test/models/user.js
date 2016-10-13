/**
 * Created by dantegg on 16/9/28.
 */
// const MemStore = require('../../store/memstore')
// const UserModel = require('../../models/user')
// const assert = require('assert')
// const runner = require('../runner')
//
// const store = new MemStore()
// const model = new UserModel(store)
//
//
// // runner([testEmail],function (err) {
// //     if(!err){
// //         console.log('All done')
// //     }
// // })
//
// describe('UserModel',function () {
//     it('could get by email',testEmail)
// })
//
// function testEmail(done) {
//     const testUser = {email:'tom@test.com',nickname:'Tom',password:'1234'}
//     model.create(testUser,function (err) {
//         assert(!err)
//         model.getByEmail('tom@test.com',function (err,user) {
//             assert(!err)
//             assert.equal(user.email,testUser.email)
//             assert.equal(user.nickname,testUser.nickname)
//             assert.equal(user.password,testUser.password)
//             done()
//         })
//     })
// }

const expect = require('chai').expect
const MemStore = require('../../store/memstore')
const UserModel = require('../../models/user')
const assert = require('assert')

const store = new MemStore()
const model = new UserModel(store)

describe('UserModel',()=>{
    it('could get by email', async ()=>{
        const testUser = {email:'tom@test.com',nickname:'Tom',password:'1234'}
        const id =await model.create(testUser)
        const user= await model.getByEmail('tom@test.com')
        expect(user.email).to.be.equal(testUser.email)
        expect(user.nickname).to.be.equal(testUser.nickname)
        expect(user.password).to.be.equal(testUser.nickname)
    })
})