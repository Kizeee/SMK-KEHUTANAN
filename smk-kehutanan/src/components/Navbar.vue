<template>
  <header class="fixed w-full bg-white shadow-md z-50">
    <nav class="container mx-auto px-6 py-3 relative">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img
              src="/logo-baru.jpg"
              alt="Logo Baru SMK Kehutanan"
              class="h-12 w-12 mr-3"
            />
            <img src="/bbksda.jpg" alt="Logo BBKSDA" class="h-12 w-12 mr-3" />
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
            <router-link to="/sarana" class="nav-link">Sarana</router-link>
            <a href="#fasilitas" class="nav-link">Fasilitas</a>
            <a href="#prestasi" class="nav-link">Prestasi</a>
            <a href="#berita" class="nav-link">Berita</a>
            <a href="#kontak" class="nav-link">Kontak</a>
          </template>
          <template v-else>
            <router-link to="/" class="nav-link">Beranda</router-link>
            <router-link to="/#tentang" class="nav-link">Tentang</router-link>
            <router-link to="/guru" class="nav-link">Guru</router-link>
            <router-link to="/#program" class="nav-link">Program</router-link>
            <router-link to="/sarana" class="nav-link">Sarana</router-link>
            <router-link to="/#fasilitas" class="nav-link"
              >Fasilitas</router-link
            >
            <router-link to="/#prestasi" class="nav-link">Prestasi</router-link>
            <router-link to="/#berita" class="nav-link">Berita</router-link>
            <router-link to="/#kontak" class="nav-link">Kontak</router-link>
          </template>
        </div>

        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden text-green-800"
        >
          <font-awesome-icon icon="fa-solid fa-bars" class="text-2xl" />
        </button>
      </div>

      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-40"
      >
        <div class="flex flex-col space-y-4 px-6">
          <template v-if="isHomePage">
            <a
              @click="isMobileMenuOpen = false"
              href="#beranda"
              class="nav-link-mobile"
              >Beranda</a
            >
            <a
              @click="isMobileMenuOpen = false"
              href="#tentang"
              class="nav-link-mobile"
              >Tentang</a
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/guru"
              class="nav-link-mobile"
              >Guru</router-link
            >
            <a
              @click="isMobileMenuOpen = false"
              href="#program"
              class="nav-link-mobile"
              >Program</a
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/sarana"
              class="nav-link-mobile"
              >Sarana</router-link
            >
            <a
              @click="isMobileMenuOpen = false"
              href="#fasilitas"
              class="nav-link-mobile"
              >Fasilitas</a
            >
            <a
              @click="isMobileMenuOpen = false"
              href="#prestasi"
              class="nav-link-mobile"
              >Prestasi</a
            >
            <a
              @click="isMobileMenuOpen = false"
              href="#berita"
              class="nav-link-mobile"
              >Berita</a
            >
            <a
              @click="isMobileMenuOpen = false"
              href="#kontak"
              class="nav-link-mobile"
              >Kontak</a
            >
          </template>
          <template v-else>
            <router-link
              @click="isMobileMenuOpen = false"
              to="/"
              class="nav-link-mobile"
              >Beranda</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/#tentang"
              class="nav-link-mobile"
              >Tentang</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/guru"
              class="nav-link-mobile"
              >Guru</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/#program"
              class="nav-link-mobile"
              >Program</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/sarana"
              class="nav-link-mobile"
              >Sarana</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/#fasilitas"
              class="nav-link-mobile"
              >Fasilitas</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/#prestasi"
              class="nav-link-mobile"
              >Prestasi</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/#berita"
              class="nav-link-mobile"
              >Berita</router-link
            >
            <router-link
              @click="isMobileMenuOpen = false"
              to="/#kontak"
              class="nav-link-mobile"
              >Kontak</router-link
            >
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue"; // <-- 1. Impor 'ref'

const route = useRoute();
const isHomePage = computed(() => route.path === "/");

// 2. Buat state untuk melacak menu mobile
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
  @apply text-green-800 hover:text-green-600 transition-colors;
}
/* 3. Style baru untuk link di menu mobile */
.nav-link-mobile {
  @apply text-green-800 hover:text-green-600 transition-colors text-lg py-2;
}
</style>
