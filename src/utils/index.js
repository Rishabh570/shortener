
module.exports = (generate, dbUtil) => {
	const urlGen = require('./urlGen')(generate, dbUtil);
	
	return {
		dbUtil,
		urlGen
	}
}