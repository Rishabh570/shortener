module.exports = (controller) =>
  function (fastify, opts, done) {
    fastify.post('/shorten', controller.shortenUrl);
    fastify.get('/:shortUrl', controller.getLongUrl);

    done();
  };