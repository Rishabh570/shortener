
module.exports = (redis, Redlock, config) => {
	const redisClient = redis.createClient(config.redisConfig);
	const redlock = new Redlock([redisClient], {retryCount:0});

	redlock.on('clientError', err => {
		console.log("A Redis Error Has Occurred : ", err);
	});

	redisClient.on('connect', function() {
		console.log("Redis connection is now open...");
	});
	
	redisClient.on('error', err => {
		console.log("Redis default connection error ", err);
	});
	
	return {
		redlock
	}
}