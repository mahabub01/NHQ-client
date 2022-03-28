<template>
  <!-- <vue3-progress-bar></vue3-progress-bar> -->

  <router-view />
</template>
<script lang="ts" setup>
// import { useProgress } from "@marcoschulte/vue3-progress";
// import { onMounted } from "vue";
// import { useRouter } from "vue-router";
// // const MenuComponent = () =>
// //   import(/* webpackPrefetch: true */ "./modules/shared/MenuComponent.vue");

// const router = useRouter();

// onMounted(() => {
//   let progress = useProgress().start();
//   router.afterEach((to, from) => {
//     progress.finish();
//   });
// });
</script>
<style scoped>
@import "~@marcoschulte/vue3-progress/dist/";
</style>
