import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCHPds6MW2WQxy_uHrlxQcsT1hqixGYghQ",
  authDomain: "smk-kehutanan.firebaseapp.com",
  projectId: "smk-kehutanan",
  storageBucket: "smk-kehutanan.firebasestorage.app",
  messagingSenderId: "726158072947",
  appId: "1:726158072947:web:4068685a4e059a3a699e06",
  measurementId: "G-G8FLGPELSL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const analytics = getAnalytics(app);