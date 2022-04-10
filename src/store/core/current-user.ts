import { useCookies } from "vue3-cookies";
import axios from "axios";

const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    user: {},
    isLoggedIn: cookies.get("user-token") == null ? false : true,
    token: cookies.get("user-token"),
  },
  getters: {
    getToken(state: any) {
      return state.token;
    },
  },
  mutations: {
    ASSIGN_CURRENT_USER(state: any, data: any) {
      state.user.name = data.name;
      state.user.email = data.email;
    },

    IS_LOGIN_ASSIGN(state: any, data: any) {
      state.isLoggedIn = data.isLoggedIn;
      state.token = data.token;
    },
  },
  actions: {
    assignCurrentUser(context: any, data: any) {
      context.commit("ASSIGN_CURRENT_USER", data);
    },

    isLogin(context: any, data: any) {
      context.commit("IS_LOGIN_ASSIGN", data);
    },
  },
};
