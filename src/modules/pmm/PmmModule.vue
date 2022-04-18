<template>
  <header-component></header-component>
  <menu-component></menu-component>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import HeaderComponent from "../shared/HeaderComponent.vue";
import MenuComponent from "../shared/MenuComponent.vue";
import { onMounted } from "vue";

onMounted(() => {
  console.log("say Hello");
});
</script>
