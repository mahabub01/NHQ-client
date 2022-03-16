<template>
  <HeaderComponent />
  <MenuComponent />
  <router-view />
</template>
<script lang="ts" setup>
import HeaderComponent from "./modules/shared/HeaderComponent.vue";
import MenuComponent from "./modules/shared/MenuComponent.vue";
</script>
