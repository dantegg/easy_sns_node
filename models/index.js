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

const redis = require('redis')
const redisWrapper = require('co-redis')
const redisClient = redis.createClient('redis://localhost:6379')
const redisCo = redisWrapper(redisClient)

const {MongoClient } = require('mongodb')

const UserModel = require('./user')
//const ActivityModel = require('./activity')
const RelationModel = require('./relation')

exports.user = new UserModel()
exports.relation = new RelationModel(redisCo)


MongoClient.connect('mongodb://localhost/easysns').then(db=>{
    exports.user.init(db.collection('user'))
})