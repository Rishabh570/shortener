const { BASE_URL } = require('../../config');

module.exports = (utils) => {
  return {
    async shortenUrl(req, res) {
      try {
		const { url } = req.body;

		const shortUrlInDb = await utils.dbUtil.findByLongUrl(url);
		if (shortUrlInDb.rows.length !== 0) return shortUrlInDb.rows[0].id;

		const shortUrl = await utils.urlGen.generateShortUrl();

		// save short URL mapping
		await utils.dbUtil.saveToDb('urlstore', {
			key: shortUrl,
			url: url,
			date: new Date().toISOString(),
		});

    	res.send({ longUrl: url, shortUrl: `${BASE_URL}/${shortUrl}` });
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