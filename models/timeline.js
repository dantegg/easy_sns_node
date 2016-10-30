/**
 * Created by dantegg on 2016/10/30.
 */
const KEY_TILMELINE = 'timeline'

class TimelineModel{
    constructor(redis){
        this.redis = redis
    }

    push(userId,activityId){
        return this.redis.zadd(KEY_TILMELINE+userId,Date.now(),activityId)
    }

    range(userId,page,pageSize){
        return this.redis.zrevrange(KEY_TILMELINE+userId,(page-1)*pageSize,page*pageSize)
    }
}

module.exports = TimelineModel