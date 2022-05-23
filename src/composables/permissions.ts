import { useStore } from "vuex";
import { computed } from "vue";

export function usePermission() {
  //create store
  const store = useStore();
  const userAllPermission = computed(() => {
    return store.state.currentUser.userPemissions;
  });

  function getPermission(permission_name: string) {
    if (Object.keys(userAllPermission.value).length !== 0) {
      if (userAllPermission.value.all_permissions.includes(permission_name)) {
        return true;
      } else {
        return false;
      }
    }
  }

  return {
    getPermission,
  };
}
