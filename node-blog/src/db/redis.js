import { createClient } from "redis";
import { REDIS_CONF } from "../conf/db.js";

const client = createClient({
  url: `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`,
});

client.on("error", (err) => console.log("Redis Client Error", err));

// 发起连接
client.connect();

export function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  return client.set(key, val);
}

export function get(key) {
  return client
    .get(key)
    .then((val) => {
      if (val == null) {
        return null;
      }

      try {
        return JSON.parse(val);
      } catch (error) {
        return val;
      }
    })
    .catch((error) => {
      return error;
    });
}

// 断开连接
// await client.disconnect();
