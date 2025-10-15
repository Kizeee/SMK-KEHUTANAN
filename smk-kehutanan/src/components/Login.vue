<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">Admin Login</h1>
        <p class="text-gray-600">Silakan masuk untuk melanjutkan</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            v-model="email" 
            id="email" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            v-model="password" 
            id="password" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
        </div>

        <button 
          type="submit" 
          :disabled="loading" 
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:bg-gray-400"
        >
          {{ loading ? 'Memproses...' : 'Login' }}
        </button>
        <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Jika berhasil, arahkan ke halaman admin
    router.push('/admin');
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage.value = 'Format email tidak valid.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        errorMessage.value = 'Email atau password salah.';
        break;
      default:
        errorMessage.value = 'Terjadi kesalahan saat login.';
        break;
    }
  } finally {
    loading.value = false;
  }
};
</script>