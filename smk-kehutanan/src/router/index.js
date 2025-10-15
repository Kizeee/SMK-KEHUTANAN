import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Impor komponen-komponen halaman Anda
import Home from "../components/Home.vue";
import Admin from "../components/Admin.vue";
import Login from "../components/Login.vue";
import GuruSection from '../components/GuruSection.vue';
import BeritaDetail from '../components/BeritaDetail.vue';
// Definisikan rute-rute aplikasi Anda
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/guru", name: "Guru", component: GuruSection },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { 
    path: '/berita/:id', // <-- 2. Tambahkan rute ini
    name: 'BeritaDetail', 
    component: BeritaDetail 
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    // Tambahkan meta field untuk menandai rute yang memerlukan autentikasi
    meta: {
      requiresAuth: true,
    },
  },
];

// Buat instance router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Helper function untuk mendapatkan status pengguna saat ini secara asynchronous.
 * Ini penting agar status login sempat terverifikasi sebelum router memutuskan.
 */
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(); // Hentikan listener setelah mendapatkan status
        resolve(user);
      },
      reject
    );
  });
};

/**
 * Navigation Guard (Penjaga Rute)
 * Logika ini akan berjalan setiap kali ada perpindahan halaman.
 */
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    // KASUS 1: Pengguna mencoba mengakses halaman yang butuh login (seperti /admin),
    // TAPI dia belum login.
    // --> Paksa alihkan (redirect) ke halaman login.
    next("/login");
  } else if (to.name === "Login" && user) {
    // KASUS 2: Pengguna sudah login,
    // TAPI dia mencoba mengakses halaman login lagi.
    // --> Alihkan dia ke halaman admin, karena tidak perlu login lagi.
    next("/admin");
  } else {
    // KASUS 3: Tidak ada masalah, lanjutkan ke halaman tujuan.
    // (Contoh: pengguna belum login mengakses halaman Home, atau pengguna sudah login mengakses halaman Admin)
    next();
  }
});

export default router;
