<template>
  <vue3-progress-bar></vue3-progress-bar>
  <menu-component></menu-component>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { useProgress } from "@marcoschulte/vue3-progress";
import MenuComponent from "../shared/MenuComponent.vue";
import { onMounted } from "vue";
import Axios from "@/http-common";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
let progress: any;
const router = useRouter();

onMounted(() => {
  progress = useProgress().start();
  let user_id = localStorage.getItem("user_id");
  getAllPermissions(user_id);
});

async function getAllPermissions(userId: string | null) {
  await Axios.get("/get-user-all-permissions/" + userId).then((response) => {
    console.log(response.data);
    store.dispatch("currentUser/assignAllPermission", response.data);
    store.dispatch("currentUser/assignCurrentUser", {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      flag: response.data.flag,
      role_id: response.data.role_id,
      role: response.data.role.name,
    });
    progress.finish();
  });
}
</script>
