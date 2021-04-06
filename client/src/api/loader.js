import axios from "axios";
import { env_config } from "./constants";

const instance = axios.create({
  baseURL:  "https://8000-red-ape-ziujmcup.ws-us03.gitpod.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    //config.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
