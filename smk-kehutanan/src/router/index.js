import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// 1. Impor SEMUA komponen halaman Anda
import Home from '../components/Home.vue';
import GuruSection from '../components/GuruSection.vue';
import SaranaSection from '../components/SaranaSection.vue';
import BeritaDetail from '../components/BeritaDetail.vue';
import Login from '../components/Login.vue';
import Admin from '../components/Admin.vue';

// 2. Definisikan rute untuk SETIAP halaman
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/guru',
    name: 'Guru',
    component: GuruSection, // Rute untuk halaman Guru
  },
  {
    path: '/sarana',
    name: 'Sarana',
    component: SaranaSection, // Rute untuk halaman Sarana
  },
  { 
    path: '/berita/:id',
    name: 'BeritaDetail', 
    component: BeritaDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
];

// 3. Buat router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4. Logika Penjaga Rute (Navigation Guard)
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next('/login');
  } else if (to.name === 'Login' && user) {
    next('/admin');
  } else {
    next();
  }
});

export default router;