import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (!response) {
      console.error(`服务器错误，请稍后重试。${response}`);
      return;
    }
    const res = response.data;
    if (!res.code || res.code === 200) {
      return res;
    } else {
      console.error(res.message || "请求错误!", 3);
      return Promise.reject(res);
    }
  },
  error => {
    console.error(`网络错误，请检查网络后重试。${error}`);
  }
);

export default service;
