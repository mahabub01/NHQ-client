export default {
  namespaced: true,
  state: {
    creatModal: false,
    editModal: false,
    filterModal: false,
    fileViewModal: false,
    loadCKEditor: false,
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
    CHNAGE_FILE_VIEW_MODAL(state: any, data: boolean) {
      state.fileViewModal = data;
    },
    LOAD_CKEDITOR_MODAL(state: any, data: boolean) {
      state.loadCKEditor = data;
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
    change_file_view_modal(context: any, data: boolean) {
      context.commit("CHNAGE_FILE_VIEW_MODAL", data);
    },
    load_ck_editor(context: any, data: boolean) {
      context.commit("LOAD_CKEDITOR_MODAL", data);
    },
  },
};
