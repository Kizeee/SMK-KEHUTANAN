<template>
  <div class="pt-12 pb-32 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Tenaga Pendidik</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">Didukung oleh guru dan instruktur yang kompeten dan berpengalaman di bidangnya.</p>
        <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div v-if="loading" class="text-center">Memuat data guru...</div>
      
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="guru in daftarGuru" :key="guru.id" class="text-center">
          <div class="relative w-40 h-40 mx-auto mb-4">
            <img :src="guru.fotoUrl" :alt="`Foto ${guru.nama}`" class="rounded-full w-full h-full object-cover shadow-lg">
          </div>
          <h3 class="text-lg font-bold text-green-800">{{ guru.nama }}</h3>
          <p class="text-sm text-gray-600">{{ guru.jabatan }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const daftarGuru = ref([]);
const loading = ref(true);

const fetchGuru = async () => {
  try {
    const q = query(collection(db, 'guru'), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    
    daftarGuru.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Gagal mengambil data guru:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchGuru);
</script>