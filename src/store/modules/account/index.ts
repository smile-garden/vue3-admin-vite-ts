import { Module } from 'vuex';
import { RootStateTypes } from '@/store/interface';
import ls from '@/utils/storage';
import { getUserInfo, login } from '@/api';
import { message } from 'ant-design-vue';
import { AccountTypes } from './interface';

const accountModule: Module<AccountTypes, RootStateTypes> = {
  state: {
    count: 0,
    token: ls.get('token', ''),
    remember: ls.get('remember', false),
    userInfo: null,
  },
  getters: {
    token(state) {
      return state.token;
    },
    remember(state) {
      return state.remember;
    },
    userInfo(state) {
      return state.userInfo || {};
    },
  },
  mutations: {
    ADD_COUNT(state) {
      state.count += 1;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      ls.set('token', token);
    },
    SET_REMEMBER(state, flag) {
      state.remember = flag;
      ls.set('remember', flag);
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info;
    },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((reslove, reject) => {
        if (data.username !== 'admin' || data.password !== '123456') {
          message.error('用户名或密码错误');
          reject();
        }
        login(data)
          .then((res) => {
            const { token } = res;
            if (token) {
              commit('SET_TOKEN', token);
              reslove(res);
            } else {
              reject(new Error('获取token失败'));
            }
          })
          .catch((err) => {
            message.error(err.message);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      commit('SET_TOKEN', '');
    },
    getUserInfo({ commit }) {
      return new Promise((reslove, reject) => {
        getUserInfo()
          .then((res) => {
            if (res) {
              commit('SET_USER_INFO', res);
            } else {
              commit('SET_TOKEN', '');
              reject(new Error('获取账户信息失败'));
            }
          })
          .catch((err) => {
            commit('SET_TOKEN', '');
            reject(err);
          });
      });
    },
  },
};

export default accountModule;
