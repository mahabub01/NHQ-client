onMounted, import { computed } from "vue";
<template>
  <div>
    <h1>Client Display</h1>
    <p v-for="list in Lists" :key="list">{{ list }}</p>
    <input type="text" v-model="data" /><button
      type="button"
      @click.prevent="send"
    >
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const Lists = ref([]);

const data = ref("");

const send = () => {
  //store.dispatch("addTask", data.value);
  // store.commit("ADD_TASK", data.value);

  // second
  store.dispatch("addData", data.value);
  console.log(store.state.secondfile.list);
};

const store = useStore();
const lists_data = computed(() => {
  return store.state.uploader.tasksList;
});

onMounted(() => {
  Lists.value = lists_data.value;
});
</script>

<style scoped></style>
