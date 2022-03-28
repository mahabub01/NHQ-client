import { createStore } from "vuex";
import fileuploader from "@/modules/shared/FileUploader/store";
import currentUser from "@/store/core/current-user";
import modalModule from "@/store/core/modal-module";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    fileuploader: fileuploader,
    currentUser: currentUser,
    modalModule: modalModule,
  },
});
