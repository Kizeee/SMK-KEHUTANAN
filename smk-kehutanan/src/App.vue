<template>
  <div>
    <Navbar />

    <main>
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
// Komponen section tidak lagi diimpor di sini
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>