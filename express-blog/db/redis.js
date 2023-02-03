const { createClient } = require("redis");
const { REDIS_CONF } = require("../conf/db.js");


let redisClient = createClient({ url: `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`, legacyMode: true })
redisClient.connect().catch(console.error)

module.exports = redisClient