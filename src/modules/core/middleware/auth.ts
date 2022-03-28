export default function (to: any, next: any, store: any) {
  if (!store.state.currentUser.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
}
