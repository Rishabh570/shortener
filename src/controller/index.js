const { BASE_URL } = require('../../config');

module.exports = (utils) => {
  return {
    async shortenUrl(req, res) {
      try {
		const { url } = req.body;

		// Obtain lock
		const lock = await utils.lockUtil.acquireLock(url);
		if (!lock) return res.send("Some error occurred. Please try again.");

		// Check in DB
		const shortUrlInDb = await utils.dbUtil.findByLongUrl(url);
		if (shortUrlInDb.rows.length !== 0) return shortUrlInDb.rows[0].id;
		
		// Not in DB, create a short key
		const shortUrl = await utils.urlGen.generateShortUrl();

		// save the mapping in DB
		await utils.dbUtil.saveToDb('urlstore', {
			key: shortUrl,
			url: url,
			date: new Date().toISOString(),
		});

		res.send({ longUrl: url, shortUrl: `${BASE_URL}/${shortUrl}` });
		
		// release the lock
		return lock.unlock()
		.catch(err => {
			console.log("ERROR WHILE UNLOCKING. ERR = ",err);
		})
      } catch (err) {
			res.code(500).send();
      }
    },
    async getLongUrl(req, res) {
      try {
		const { shortUrl } = req.params;

		const queryRes = await utils.dbUtil.findByShortUrl(shortUrl);
		if (queryRes.rows.length === 0) return null; // non-existent short Url

		const longUrl = queryRes.rows[0].url;
    	if (longUrl === null) return res.code(404).send();
    	res.code(302).redirect(longUrl);
      } catch (err) {
        res.code(500).send();
      }
    },
  };
};