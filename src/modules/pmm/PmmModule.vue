<template>
  <menu-component></menu-component>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import MenuComponent from "../shared/MenuComponent.vue";
import { onMounted } from "vue";
import Axios from "@/http-common";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  let user_id = localStorage.getItem("user_id");
  getAllPermissions(user_id);
});

async function getAllPermissions(userId: string | null) {
  await Axios.get("/get-user-all-permissions/" + userId).then((response) => {
    store.dispatch("currentUser/assignAllPermission", response.data);
    store.dispatch("currentUser/assignCurrentUser", {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      flag: response.data.flag,
      role_id: response.data.role_id,
      role: response.data.role.name,
    });
  });
}
</script>
