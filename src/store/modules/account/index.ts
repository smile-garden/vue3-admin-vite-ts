import { Module } from 'vuex';
import { RootStateTypes } from '@/store/interface';
import ls from '@/utils/storage';
import { login } from '@/api';
import { message } from 'ant-design-vue';
import { AccountTypes } from './interface';

const accountModule: Module<AccountTypes, RootStateTypes> = {
  state: {
    count: 0,
    token: ls.get('token', ''),
    remember: ls.get('remember', false),
  },
  getters: {
    token(state) {
      return state.token;
    },
    remember(state) {
      return state.remember;
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
            console.log(res);
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
  },
};

export default accountModule;
