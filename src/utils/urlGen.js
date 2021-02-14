const { shortUrlLength } = require('../../config');

module.exports = (nanoid, dbUtil) => {
  return {
    async generateShortUrl() {
     	const shortUrl = nanoid(shortUrlLength);
     	const isShortUrlTaken = await dbUtil.findByShortUrl(shortUrl);
     	if (isShortUrlTaken.rows.length === 0) return shortUrl;

      	throw new Error('Could not generate a unique short key');
    },
  };
};