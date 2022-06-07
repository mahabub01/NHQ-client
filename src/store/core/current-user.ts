export default {
  namespaced: true,
  state: {
    user: {
      id: "",
      name: "",
      email: "",
      role: {},
      role_id: "",
      flag: "",
    },
    isLoggedIn: localStorage.getItem("token") != "" ? true : false,
    token: localStorage.getItem("token"),
    userPemissions: {},
    testData: {
      id: "test id",
      name: "test name",
      email: "test email",
    },
  },
  getters: {
    getToken(state: any) {
      return state.token;
    },
    getUser(state: any) {
      return state.test;
    },
  },
  mutations: {
    ASSIGN_CURRENT_USER(state: any, data: any) {
      state.user.id = data.id;
      state.user.name = data.name;
      state.user.email = data.email;
      state.user.role_id = data.role_id;
      state.user.role = data.role.name;
      state.user.flag = data.flag;
    },

    IS_LOGIN_ASSIGN(state: any, data: any) {
      state.isLoggedIn = data.isLoggedIn;
      state.token = data.token;
      state.user.id = data.user.id;
      state.user.name = data.user.name;
      state.user.email = data.user.email;
      state.user.role = data.user.role.name;
      state.user.role_id = data.user.role.id;
      state.user.flag = data.user.flag;
    },

    ASSIGN_ALL_PERMISSION(state: any, data: any) {
      state.userPemissions = data;
    },

    CHANGE(state: any, data: any) {
      console.log(data);
      state.testData.id = data.id;
      state.testData.name = data.name;
      state.testData.email = data.email;
      console.log("data from state" + state.testData.email);
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

    change(context: any, data: any) {
      context.commit("CHANGE", data);
    },
  },
};
