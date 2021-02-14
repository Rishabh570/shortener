const loader = require('./src/loaders/index');

// Load dependencies and connections
loader
  .init()
  .then(({ fastify }) => {
    const { PORT, env } = require('./config');

    // Catching errors
    process.on('uncaughtException', (err) => {
	  console.log('err: ', err);
      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
	  console.log('err: ', err);
      process.exit(1);
    });

    // Start the server
    fastify.listen(PORT, '0.0.0.0', function (err, address) {
      if (err) {
		console.log('err: ', err);
        process.exit(1);
      }
      console.log(`${env}: Server running at address = ${address}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });