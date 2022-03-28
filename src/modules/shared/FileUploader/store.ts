export default {
  state: {
    filename_one: "",
    filename_two: "",
    filename_three: "",
  },
  getters: {},
  mutations: {
    ADD_FILE_NAME_ONE(state: any, filename: any) {
      state.filename_one = filename;
    },

    ADD_FILE_NAME_TWO(state: any, filename: any) {
      state.filename_two = filename;
    },

    addFileNameThree(state: any, filename: any) {
      state.filename_three = filename;
    },
  },
  actions: {
    addFileNameOne(context: any, filename_one: any) {
      context.commit("ADD_FILE_NAME_ONE", filename_one);
    },
    addFileNameTwo(context: any, filename_two: any) {
      context.commit("ADD_FILE_NAME_TWO", filename_two);
    },
    addFileNameThree(context: any, filename_three: any) {
      context.commit("ADD_FILE_NAME_THREE", filename_three);
    },
  },
};
