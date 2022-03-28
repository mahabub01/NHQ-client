export default {
  state: {
    list: ["list 1"],
  },
  getters: {},
  mutations: {
    ADD_DATA(state: any, data: any) {
      state.list.push(data);
    },
  },
  actions: {
    addData(context: any, data: any) {
      context.commit("ADD_DATA", data);
    },
  },
};
