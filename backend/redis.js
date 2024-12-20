const Redis = require('ioredis');

// Configure Redis connection
const redis = new Redis({
  host: 'localhost',   // Redis server hostname (default is localhost)
  port: 6379,          // Redis server port (default is 6379)
  // password: 'your-redis-password',  // Uncomment and set if Redis is password protected
});

module.exports = redis;
