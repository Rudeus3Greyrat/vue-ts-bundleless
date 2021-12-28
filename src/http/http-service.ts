import request from "./axios";

function get(url, params) {
  return request({
    method: "get",
    url,
    params
  });
}

function post(url, data, blob) {
  if (blob) {
    return request({
      method: "post",
      url,
      data,
      responseType: "blob"
    });
  }

  return request({
    method: "post",
    url,
    data
  });
}

function put(url, data) {
  return request({
    method: "put",
    url,
    data
  });
}

export default {
  get,
  post,
  put
};
