module.exports = {
	BASE_URL: process.env.BASE_URL || 'localhost:3000',
	PORT: process.env.PORT || 3000,
	debug: process.env.DEBUG || false,
	shortUrlLength: 5,
	lockTTL: 60000, // 1 min

	db: {
	  user: process.env.DB_USER || 'dbuser',
	  host: process.env.DB_HOST || '127.0.0.1',
	  database: process.env.DB_NAME || 'dbname',
	  password: process.env.DB_PASSWORD || 'dbpassword',
	  port: 5432,
	},

	redisConfig: {
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || 6379,
	},
};