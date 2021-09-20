const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    client;
    constructor () {
	this.client = redis.createClient();
	this.client.on('error', err => console.log(err));
    }

    isAlive() {
	return this.client.connected;
    }
    async get(key) {
	const getAsync = promisify(this.client.get).bind(this.client);
	return await getAsync(key);
    }

    async set(key, value, dur) {
	const setAsync = promisify(this.client.set).bind(this.client);
	return await setAsync(key, value, 'EX', dur);
    }
    async del(key) {
	const delAsync = promisify(this.client.del).bind(this.client);
	return await delAsync(key);
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
