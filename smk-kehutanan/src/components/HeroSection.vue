<template>
  <section id="beranda" class="pt-20 relative h-screen">
    <div v-if="loading" class="w-full h-full flex items-center justify-center bg-gray-200">
      <p>Memuat slider...</p>
    </div>

    <swiper
      v-else-if="slides.length > 0"
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      class="w-full h-full"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div 
          class="w-full h-full bg-cover bg-center flex items-center justify-center" 
          :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.imageUrl}')` }"
        >
          <div class="max-w-2xl mx-auto text-center text-white px-6">
            <h2 class="text-4xl md:text-6xl font-bold mb-6" v-html="slide.title"></h2>
            <p class="text-xl mb-8 opacity-90">{{ slide.subtitle }}</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#program" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">Lihat Program</a>
              <a href="#kontak" class="border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-lg">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div v-if="!loading && slides.length > 0">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = ref([]);
const loading = ref(true);

const fetchSlides = async () => {
  try {
    const q = query(collection(db, 'hero_slider'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    slides.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Gagal mengambil data slider:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSlides);
</script>

<style scoped>
/* Style kustom untuk Swiper (tetap sama) */
.swiper-button-prev, .swiper-button-next { color: #ffffff; background-color: rgba(0, 0, 0, 0.3); width: 50px; height: 50px; border-radius: 50%; transition: background-color 0.3s ease; }
.swiper-button-prev:hover, .swiper-button-next:hover { background-color: rgba(0, 0, 0, 0.6); }
.swiper-button-prev::after, .swiper-button-next::after { font-size: 20px; }
:deep(.swiper-pagination-bullet) { background-color: #ffffff; width: 12px; height: 12px; opacity: 0.7; }
:deep(.swiper-pagination-bullet-active) { background-color: #22c55e; opacity: 1; }
</style>