/**
 * Created by dantegg on 2016/10/27.
 */


const models = require('../models')
const UserService = require('./user')
//const ActivityService = require('./activity')

exports.user = new UserService(models.user,models.relation)