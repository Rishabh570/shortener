const { lockTTL } = require('../../config');

module.exports = (redlock) => {
	return {
		acquireLock(key) {
			return redlock.lock(key, lockTTL)
				.then(lock => {
					return lock;
				})
				.catch(err => {
					console.log('Could not obtain lock. ERR = : ', err.message);
					return null;
				});
		},
	}
}