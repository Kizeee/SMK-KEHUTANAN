<template>
  <div class="py-32 bg-white min-h-screen">
    <div class="container mx-auto px-6 max-w-4xl">
      <div v-if="loading" class="text-center">Memuat berita...</div>
      <div v-else-if="berita">
        <h1 class="text-4xl md:text-5xl font-bold text-green-800 mb-4">{{ berita.judul }}</h1>
        <p class="text-gray-500 mb-6">Dipublikasikan pada {{ formatTimestamp(berita.createdAt) }}</p>
        
        <img :src="berita.imageUrl" :alt="berita.judul" class="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8">
        
        <div class="prose max-w-none" v-html="berita.isi"></div>

        <router-link to="/" class="inline-block mt-12 text-green-600 hover:underline">&larr; Kembali ke Beranda</router-link>
      </div>
      <div v-else class="text-center">
        <h1 class="text-3xl font-bold">Berita tidak ditemukan</h1>
        <router-link to="/" class="mt-4 inline-block text-green-600">Kembali ke Beranda</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const route = useRoute();
const berita = ref(null);
const loading = ref(true);

const formatTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return null;
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

onMounted(async () => {
  try {
    const beritaId = route.params.id;
    const docRef = doc(db, "berita", beritaId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      berita.value = docSnap.data();
    } else {
      console.log("Tidak ada dokumen seperti itu!");
    }
  } catch (error) {
    console.error("Gagal mengambil detail berita:", error);
  } finally {
    loading.value = false;
  }
});
</script>