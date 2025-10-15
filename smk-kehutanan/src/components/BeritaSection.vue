<template>
  <section id="berita" class="py-20 bg-green-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Berita & Informasi</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">Ikuti kegiatan dan informasi terbaru dari sekolah kami.</p>
        <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div v-if="loading" class="text-center">Memuat berita...</div>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in daftarBerita" :key="item.id" class="bg-white rounded-lg shadow-lg overflow-hidden group">
          <router-link :to="'/berita/' + item.id">
            <img :src="item.imageUrl" :alt="item.judul" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="p-6">
              <p class="text-sm text-gray-500 mb-2">{{ formatTimestamp(item.createdAt) }}</p>
              <h3 class="text-xl font-bold text-green-800 group-hover:text-green-600 transition-colors">{{ item.judul }}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const daftarBerita = ref([]);
const loading = ref(true);

const formatTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return null;
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

const fetchBerita = async () => {
  try {
    // Ambil 3 berita terbaru saja untuk halaman utama
    const q = query(collection(db, 'berita'), orderBy('createdAt', 'desc'), limit(3));
    const querySnapshot = await getDocs(q);
    daftarBerita.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBerita);
</script>