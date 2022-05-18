import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    user: cookies.get("user-token") == null ? {} : cookies.get("user"),
    isLoggedIn: cookies.get("user-token") == null ? false : true,
    token: cookies.get("user-token"),
    userPemissions: {},
  },
  getters: {
    getToken(state: any) {
      return state.token;
    },
  },
  mutations: {
    ASSIGN_CURRENT_USER(state: any, data: any) {
      state.user.id = data.id;
      state.user.name = data.name;
      state.user.email = data.email;
    },

    IS_LOGIN_ASSIGN(state: any, data: any) {
      state.isLoggedIn = data.isLoggedIn;
      state.token = data.token;
    },

    ASSIGN_ALL_PERMISSION(state: any, data: any) {
      state.userPemissions = data;
    },
  },
  actions: {
    assignCurrentUser(context: any, data: any) {
      context.commit("ASSIGN_CURRENT_USER", data);
    },

    isLogin(context: any, data: any) {
      context.commit("IS_LOGIN_ASSIGN", data);
    },

    assignAllPermission(context: any, data: any) {
      context.commit("ASSIGN_ALL_PERMISSION", data);
    },
  },
};
