export default {
  namespace: true,
  state: {
    file_1: "",
    file_2: "",
    file_3: "",
    tasksList: ["task 1", "task 2", "task 3", "task 4", "task 5"],
  },
  getters: {
    // getTask: function (state) {
    //   return `${state.tasks}`;
    // },
  },
  mutations: {
    ADD_TASK(state: any, data: any) {
      state.tasksList.push(data);
    },
  },
  actions: {
    addTask(context: any, data: any) {
      context.commit("ADD_TASK", data);
    },
  },
};
