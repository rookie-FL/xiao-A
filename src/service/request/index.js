import axios from "axios";
import { BASE_URL, TIMEOUT } from "../config/config";

// 对axios的封装
class ZYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({
      ...config,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 或指定允许访问的特定源
      },
    });
  }

  post(config) {
    return this.request({
      ...config,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 或指定允许访问的特定源
      },
    });
  }
}

export let requests = new ZYRequest(BASE_URL, TIMEOUT);
