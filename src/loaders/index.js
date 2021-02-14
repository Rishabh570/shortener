 const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true,
  bodyLimit: 1000000,
});

const config = require('../../config');
const pool = new Pool(config.db);

module.exports = {
	init() {
		return new Promise((resolve, reject) => {
			const dbUtil = require('../utils/database')(pool);
			const utils = require('../utils/index')(nanoid, dbUtil);
			const controller = require('../controller/index')(utils);
			const postgres = require('./postgres')(pool);
			const routes = require('../routes/index')(controller);

			postgres
			.initialize()
			.then(() => {
				fastify.register(routes);
				resolve({ fastify });
			})
			.catch((err) => {
				console.log(`Failed to initialize connections in loader. err = ${err}`);
				reject(err);
			});
		});
	}
}