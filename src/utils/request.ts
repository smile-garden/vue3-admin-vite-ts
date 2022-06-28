import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'qs';
import router from '@/router';
import store from '@/store';
import ls from './storage';

const formContentType: string = 'application/x-www-form-urlencoded;charset=utf-8';
const methods: string[] = ['post', 'put', 'delete'];
const InvalidCode = 1000000;

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 20000,
  withCredentials: true, // 跨域请求时发送cookie
  headers: { 'Content-Type': formContentType },
});

// 拦截请求
request.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = config.headers || {};
    const token = await ls.get('token');
    if (token) {
      config.headers.Token = token;
    }
    if (config.headers['Content-Type'] === formContentType && methods.includes(config.method || '')) {
      config.data = stringify(config.data);
    }
    return config;
  },
  (err) => Promise.reject(err),
);

// 拦截响应
request.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data && res.data.code) {
      if (res.data.code === 1) {
        return res.data.data;
      }
      if (res.data.code === InvalidCode) {
        store.commit('SET_TOKEN', '');
        router.replace({
          name: 'accountLogin',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        });
        // window.location.reload();
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ msg: res.data.msg || '登录失效' });
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ msg: 'Network error' });
  },
  (err) => Promise.reject(err),
);

export default request;
