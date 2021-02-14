
module.exports = (generate, dbUtil, redlock) => {
	const urlGen = require('./urlGen')(generate, dbUtil);
	const lockUtil = require('./lock')(redlock);
	
	return {
		dbUtil,
		urlGen,
		lockUtil
	}
}