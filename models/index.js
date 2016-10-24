/**
 * Created by dantegg on 16/9/28.
 */
// const  MemStore = require('../store/memstore')
// const BaseModel = require('./base')
// const UserModel = require('./user')
//
// const memStore = new MemStore()
//
// exports.user = new UserModel(memStore)
//
// exports.token = new BaseModel(memStore,'token:')

const {MongoClient } = require('monodb')

const UserModel = require('./user')

exports.user = new UserModel()

MongoClient.connect('mongodb://localhost/easysns').then(db=>{
    exports.user.init(db.collection('user'))
})