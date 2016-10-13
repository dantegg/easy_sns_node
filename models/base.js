/**
 * Created by dantegg on 16/9/28.
 */
// function BaseModel(store,prefix) {
//     this.store = store
//     this.prefix = prefix
// }
//
// module.exports = BaseModel
//
//
// BaseModel.prototype.create = function (obj,callback) {
//     obj.id = obj.id || Date.now()
//     this.store.set(this.prefix + obj.id,obj,callback)
// }
//
// BaseModel.prototype.get = function (id,callback) {
//     this.store.get(this.prefix + id, callback)
// }
//
// BaseModel.prototype.update = function (id,obj,callback) {
//     this.store.set(this.prefix + id,obj,callback)
// }
//
// BaseModel.prototype.del = function (id,callback) {
//     this.store.del(this.prefix + id,callback)
// }
//
//
// BaseModel.prototype.updatePart = function (id,part,callback) {
//     const self = this
//     this.get(id,function(err,result){
//         if(err || !result){
//             callback(err,result)
//         }
//         Object.assign(result,part)
//         self.update(id,result,callback)
//     })
// }

class BaseModel{
    constructor(store,prefix){
        this.store = store
        this.prefix = prefix
    }

    async create(obj){
        obj.id = obj.id || Date.now()
        await this.store.set(this.prefix+obj.id,obj)
        return obj.id
    }

    async get(id){
        return await this.store.get(this.prefix + id )
    }

    async update(id,obj){
        await this.store.set(this.prefix + id,obj)
    }

    async updatePart(id,part){
        var result = await this.get(id)
        Object.assign(result,part)
        await this.update(id,result)
    }

    async del(id){
        await this.store.del(this.prefix+id)
    }
}

model.exports = BaseModel