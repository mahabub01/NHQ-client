export default {
  namespaced: true,
  state: {
    creatModal: false,
  },
  getters: {},
  mutations: {
    CHNAGE_CREATE_MODAL(state: any, data: boolean) {
      state.creatModal = data;
    },
  },
  actions: {
    change_create_modal(context: any, data: boolean) {
      context.commit("CHNAGE_CREATE_MODAL", data);
    },
  },
};
