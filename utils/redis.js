const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.log('Redis client error', err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, rep) => {
        if (err) {
          reject(err);
        } else {
          resolve(rep);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, rep) => {
        if (err) {
          reject(err);
        } else {
          resolve(rep);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, rep) => {
        if (err) {
          reject(err);
        } else {
          resolve(rep);
        }
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
