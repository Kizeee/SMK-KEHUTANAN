<template>
  <section id="beranda" class="pt-20 relative h-screen">
    <swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :pagination="{ clickable: true }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      class="w-full h-full"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div 
          class="w-full h-full bg-cover bg-center flex items-center justify-center" 
          :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.image}')` }"
        >
          <div class="max-w-2xl mx-auto text-center text-white px-6">
            <h2 class="text-4xl md:text-6xl font-bold mb-6" v-html="slide.title"></h2>
            <p class="text-xl mb-8 opacity-90">{{ slide.subtitle }}</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#program" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Lihat Program Kami
              </a>
              <a href="#kontak" class="border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </section>
</template>

<script setup>
// Impor komponen dan modul Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Impor CSS Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- GANTI GAMBAR DI SINI ---
// Data untuk 3 slide. Anda bisa mengganti URL gambar ini dengan gambar Anda sendiri.
// Unggah gambar Anda ke Cloudinary dan tempelkan URL-nya di sini.
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2560&auto=format&fit=crop',
    title: 'Membangun Generasi <span class="text-green-300">Unggul</span> di Bidang Kehutanan',
    subtitle: 'Mencetak Tenaga Terampil dan Profesional dalam Pengelolaan Sumber Daya Hutan',
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
    title: 'Pendidikan Berbasis <span class="text-green-300">Praktik</span> Lapangan',
    subtitle: 'Mempersiapkan siswa dengan keahlian nyata yang dibutuhkan industri.',
  },
  {
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2574&auto=format&fit=crop',
    title: 'Menuju Masa Depan <span class="text-green-300">Hijau</span> dan Berkelanjutan',
    subtitle: 'Berkomitmen pada konservasi dan pelestarian lingkungan.',
  },
];
</script>

<style scoped>
/* Kustomisasi tampilan tombol navigasi dan paginasi Swiper */
.swiper-button-prev,
.swiper-button-next {
  color: #ffffff; /* Warna panah */
  background-color: rgba(0, 0, 0, 0.3); /* Latar belakang semi-transparan */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px; /* Ukuran panah */
}

/* Menggunakan 'deep selector' untuk menargetkan elemen paginasi Swiper */
:deep(.swiper-pagination-bullet) {
  background-color: #ffffff;
  width: 12px;
  height: 12px;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #22c55e; /* Warna hijau untuk slide aktif */
  opacity: 1;
}
</style>