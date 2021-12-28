import api from "./api";
import Request from "./http-service";

// demo
export const demo = params => Request.get(api.demo, params);
