import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

export const isUserLoggedIn = ref(false);
export const currentUser = ref(null);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    isUserLoggedIn.value = true;
    currentUser.value = user;
  } else {
    isUserLoggedIn.value = false;
    currentUser.value = null;
  }
});