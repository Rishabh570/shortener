module.exports = (pool) => {
	return {
	  query(queryStr) {
		return pool.query(queryStr);
	  },
	  async findByShortUrl(shortUrl) {
		try {
		  return await this.query({
			text: 'SELECT * FROM "urlstore" WHERE "key" = $1;',
			values: [shortUrl],
		  });
		} catch (err) {
		  console.log(`Error while finding by short url. err = ${err}`);
		  throw err;
		}
	  },
	  async findByLongUrl(longUrl) {
		try {
		  return await this.query({
			text: 'SELECT * FROM "urlstore" WHERE "url" = $1;',
			values: [longUrl],
		  });
		} catch (err) {
		  console.log(`Error while finding by long url. err = ${err}`);
		  throw err;
		}
	  },
	  async saveToDb(table, data) {
		let queryKeys = `INSERT INTO "${table}" (`;
		let queryValues = ` VALUES (`;
		let counter = 1;
		const values = [];
  
		Object.keys(data).forEach(function (key) {
		  if (counter < Object.keys(data).length) {
			queryKeys += `"${key}", `;
			queryValues = `${queryValues}$${counter}, `;
		  } else if (counter === Object.keys(data).length) {
			queryKeys += `"${key}")`;
			queryValues = `${queryValues}$${counter})`;
		  }
		  counter += 1;
		  values.push(data[key]);
		});

		const queryData = {
		  text: queryKeys + queryValues,
		  values,
		};

		try {
		  return await this.query(queryData);
		} catch (err) {
		  console.log(`Error occurred in saveToDb. err = ${err}`);
		  throw err;
		}
	  },
	};
  };