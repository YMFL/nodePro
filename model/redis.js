var redis = require('redis'),
  client = redis.createClient();

// Redis 单例
class Redis {
  static getInstance() {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }
  constructor() {
  }
  async get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, res) => {
        if (res) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }
  set(key, value) {
    client.setex(key, 3600, value);
  }
}


module.exports = Redis.getInstance();
