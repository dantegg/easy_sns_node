/**
 * Created by dantegg on 2016/10/27.
 */


const models = require('../models')
const UserService = require('./user')
const ActivityService = require('./activity')
const WSManager = require('./WSManager')
exports.wsManager = new WSManager()
exports.user = new UserService(models.user,models.relation)
//exports.activity = new ActivityService(models.activity,exports.user,models.relation,models.timeline)
exports.activity = new ActivityService(exports.user,exports.wsManager)