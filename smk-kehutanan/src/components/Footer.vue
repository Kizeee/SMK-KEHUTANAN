<template>
  <footer class="bg-green-900 text-white py-12">
    <div class="container mx-auto px-6">
      <div class="text-center">
        <img
          src="/logo-footer.jpg"
          alt="Logo Baru SMK Kehutanan"
          class="h-12 w-12 mb-4 mx-auto"
        />
        <h3 class="text-xl font-bold mb-4">SMK Kehutanan Negeri Pekanbaru</h3>
        <p class="text-green-300 text-sm mb-6">
          Membangun Generasi Unggul di Bidang Kehutanan
        </p>
        <div class="flex justify-center space-x-6 mb-8">
          <a href="#" class="hover:text-green-300 transition-colors"
            ><font-awesome-icon icon="fa-brands fa-facebook-f" class="text-xl"
          /></a>
          <a href="#" class="hover:text-green-300 transition-colors"
            ><font-awesome-icon icon="fa-brands fa-instagram" class="text-xl"
          /></a>
          <a href="#" class="hover:text-green-300 transition-colors"
            ><font-awesome-icon icon="fa-brands fa-youtube" class="text-xl"
          /></a>
        </div>
        <div class="border-t border-green-700 pt-6">
          <router-link
            to="/admin"
            class="text-sm text-green-400 hover:underline mb-2 block"
            >Halaman Admin</router-link
          >
          <p class="text-sm text-green-400">
            &copy; {{ new Date().getFullYear() }} SMK Kehutanan Negeri
            Pekanbaru. Semua Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
