const Redis = require('ioredis');
require('dotenv').config();

const useTLS = process.env.REDIS_USE_TLS === 'true';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

redis.ping()
  .then(result => {
    console.log('Redis connection successful:', result); // should log "PONG"
  })
  .catch(error => {
    console.error('Redis connection failed:', error.message);
  });


module.exports = redis;
