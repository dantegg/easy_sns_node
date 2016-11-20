/**
 * Created by dantegg on 2016/10/30.
 */
const KEY_TIMELINE = 'timeline:'

class TimelineModel{
    constructor (redis) {
        this.redis = redis
    }

    push(userId,activityId){
        console.log('timelineModel is',this)

        return this.redis.zadd(KEY_TIMELINE + userId, Date.now(),''+ activityId)
    }

    range(userId,page,pageSize){
        return this.redis.zrevrange(KEY_TIMELINE+userId,(page-1)*pageSize,page*pageSize)
    }
}

module.exports = TimelineModel