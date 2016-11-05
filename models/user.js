/**
 * Created by dantegg on 16/9/28.
 */
// const BaseModel = require('./base')
//
// function UserModel(store) {
//     BaseModel.call(this,store,'user:')
// }
//
//
// module.exports = UserModel
//
// const PREFIX_EMAIL_TO_ID = 'email-id:'
//
// Object.assign(UserModel.prototype,BaseModel.prototype,{
//     create: function (obj,callback) {
//         const self = this
//         BaseModel.prototype.create.call(this,obj,function (err,result) {
//             if(err){
//                 return callback(err)
//             }
//             if(obj.email){
//                 self.store.set(PREFIX_EMAIL_TO_ID + obj.email,obj.id,callback)
//                 return
//             }
//             callback(err,result)
//         })
//     },
//     getByEmail:function (email,callback) {
//         const self = this
//         this.store.get(PREFIX_EMAIL_TO_ID+email,function (err,id) {
//             if(err){
//                 return callback(err)
//             }
//             self.get(id,callback)
//         })
//     }
//
// })


// const BaseModel = require('./base')
// const PREFIX_EMAIL_TO_ID = 'email-id'
//
// class UserModel extends BaseModel{
//     constructor(store){
//         super(store,'user:')
//     }
//
//     create(obj){
//         return super.create(obj).then((id)=>{
//             return this.store.set(PREFIX_EMAIL_TO_ID+obj.email,id).then(()=>id)
//         })
//     }
//
//     // async create(obj){
//     //     const id = await super.create(obj)
//     //     await this.store.set(PREFIX_EMAIL_TO_ID+obj.email,id)
//     //     return id
//     // }
//     async getByEmail(email){
//         const id = await this.store.get(PREFIX_EMAIL_TO_ID + email)
//         return await this.get(id)
//     }
// }


const MongoBaseModel = require('./mongobase')

class UserModel extends MongoBaseModel{
    init(collection){
        this.collection = collection
        this.collection.createIndex({email:1},{unique:true}).then()
        this.collection.createIndex((nickname:1),{unique:true  }).then()
    }

    async getByEmail(email){
        return await this.collection.findOne({email:email})
    }
}

module.exports = UserModel