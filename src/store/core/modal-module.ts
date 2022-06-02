export default {
  namespaced: true,
  state: {
    avatarModal: false,
    creatModal: false,
    editModal: false,
    passwordModal: false,
    filterModal: false,
    fileViewModal: false,
    fileModal: false,
    loadCKEditor: false,
    importModal: false,
  },
  getters: {},
  mutations: {
    CHNAGE_AVATAR_MODAL(state: any, data: boolean) {
      state.avatarModal = data;
    },
    CHNAGE_CREATE_MODAL(state: any, data: boolean) {
      state.creatModal = data;
    },
    CHNAGE_EDIT_MODAL(state: any, data: boolean) {
      state.editModal = data;
    },
    CHNAGE_PASSWORD_MODAL(state: any, data: boolean) {
      state.passwordModal = data;
    },
    CHNAGE_FILE_MODAL(state: any, data: boolean) {
      state.fileModal = data;
    },
    CHNAGE_FILTER_MODAL(state: any, data: boolean) {
      state.filterModal = data;
    },
    CHNAGE_FILE_VIEW_MODAL(state: any, data: boolean) {
      state.fileViewModal = data;
    },
    CHNAGE_IMPORT_MODAL(state: any, data: boolean) {
      state.importModal = data;
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
    change_file_modal(context: any, data: boolean) {
      context.commit("CHNAGE_FILE_MODAL", data);
    },
    change_filter_modal(context: any, data: boolean) {
      context.commit("CHNAGE_FILTER_MODAL", data);
    },
    change_import_modal(context: any, data: boolean) {
      context.commit("CHNAGE_IMPORT_MODAL", data);
    },
    change_file_view_modal(context: any, data: boolean) {
      context.commit("CHNAGE_FILE_VIEW_MODAL", data);
    },
    load_ck_editor(context: any, data: boolean) {
      context.commit("LOAD_CKEDITOR_MODAL", data);
    },
  },
};
