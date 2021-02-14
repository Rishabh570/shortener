module.exports = (pool) => {
	return {
	  initialize() {
		const queryStr1 = `
		CREATE TABLE IF NOT EXISTS "urlstore" (
		  "key" VARCHAR(128) PRIMARY KEY,
		  "url" TEXT,
		  "date" DATE
		  );
		  `;

		return pool.query(queryStr1)
			.then(() => {
				console.log('Table initialized successfully.');
			})
			.catch((err) => {
				console.log(`Error occurred while initializing table. err = ${err}`);
			});
	  },
	};
  };