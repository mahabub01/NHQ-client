<template>
  <menu-component></menu-component>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
// import HeaderComponent from "../shared/HeaderComponent.vue";
import MenuComponent from "../shared/MenuComponent.vue";
import Axios from "@/http-common";
import { useStore } from "vuex";

//const userId = ref(91);
const store = useStore();

onMounted(() => {
  //console.log("Dashboard");
  //console.log(store.state.currentUser.userPemissions);
  let user_id = localStorage.getItem("user_id");
  getAllPermissions(user_id);
});

async function getAllPermissions(userId: string | null) {
  await Axios.get("/get-user-all-permissions/" + userId).then((response) => {
    store.dispatch("currentUser/assignAllPermission", response.data);
    //store.dispatch("currentUser/change", "SOMETHING from core");
  });
}
</script>
