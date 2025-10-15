<template>
  <header class="fixed w-full bg-white shadow-md z-50">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img
              src="/logo-baru.jpg"
              alt="Logo Baru SMK Kehutanan"
              class="h-12 w-12 mr-3"
            />
            <img
              src="/bbksda.jpg"
              alt="Logo SMK Kehutanan"
              class="h-12 w-12 mr-3"
            />
            <div>
              <h1 class="text-xl font-bold text-green-800">SMK Kehutanan</h1>
              <p class="text-sm text-green-600">Negeri Pekanbaru</p>
            </div>
          </router-link>
        </div>

        <div class="hidden md:flex space-x-8">
          <template v-if="isHomePage">
            <a href="#beranda" class="nav-link">Beranda</a>
            <a href="#tentang" class="nav-link">Tentang</a>
            <router-link to="/guru" class="nav-link">Guru</router-link>
            <a href="#program" class="nav-link">Program</a>
            <a href="#fasilitas" class="nav-link">Fasilitas</a>
            <a href="#prestasi" class="nav-link">Prestasi</a>
            <a href="#galeri" class="nav-link">Galeri</a>
            <a href="#kontak" class="nav-link">Kontak</a>
          </template>
          <template v-else>
            <router-link to="/" class="nav-link">Beranda</router-link>
            <router-link to="/guru" class="nav-link">Guru</router-link>
            <router-link to="/#program" class="nav-link">Program</router-link>
            <router-link to="/#fasilitas" class="nav-link"
              >Fasilitas</router-link
            >
            <router-link to="/#kontak" class="nav-link">Kontak</router-link>
          </template>
        </div>

        <button class="md:hidden text-green-800">
          <font-awesome-icon icon="fa-solid fa-bars" class="text-2xl" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

// Dapatkan informasi rute (halaman) yang sedang aktif
const route = useRoute();

// Buat variabel reaktif untuk memeriksa apakah kita sedang di halaman utama
// Nilainya akan 'true' jika path URL adalah '/', dan 'false' jika bukan.
const isHomePage = computed(() => route.path === "/");
</script>

<style scoped>
/* Kelas ini digunakan untuk membuat style link konsisten */
.nav-link {
  @apply text-green-800 hover:text-green-600 transition-colors;
}
</style>
