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
const {MongoClient } = require('mongodb')
const redis = require('redis')
const redisWrapper = require('co-redis')

const redisClient = redis.createClient('redis://localhost:6379')
const redisCo = redisWrapper(redisClient)


const UserModel = require('./user')
const ActivityModel = require('./activity')
const RelationModel = require('./relation')
const timelineModel = require('./timeline')

exports.user = new UserModel()
exports.timeline = new timelineModel(redisCo)
exports.activity = new ActivityModel()
exports.relation = new RelationModel(redisCo)


MongoClient.connect('mongodb://localhost/easysns')
    .then(db=>{
    exports.user.init(db.collection('user'))
    exports.activity.init(db.collection('activity'))
})