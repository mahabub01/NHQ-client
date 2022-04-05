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
    CHNAGE_EDIT_MODAL(state: any, data: boolean) {
      state.editModal = data;
    },
    CHNAGE_FILTER_MODAL(state: any, data: boolean) {
      state.filterModal = data;
    },
  },
  actions: {
    change_create_modal(context: any, data: boolean) {
      context.commit("CHNAGE_CREATE_MODAL", data);
    },
    change_edit_modal(context: any, data: boolean) {
      context.commit("CHNAGE_EDIT_MODAL", data);
    },
    change_filter_modal(context: any, data: boolean) {
      context.commit("CHNAGE_FILTER_MODAL", data);
    },
  },
};
