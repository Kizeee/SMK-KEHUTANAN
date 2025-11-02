<template>
  <div class="pt-12 pb-32 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Sarana & Prasarana</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">Daftar fasilitas pendukung kegiatan belajar mengajar di SMK Kehutanan Negeri Pekanbaru.</p>
        <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div v-if="loading" class="text-center text-gray-600">
        Memuat data sarana...
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div v-if="daftarSarana.length === 0" class="col-span-full text-center">
          <p>Belum ada data sarana.</p>
        </div>
        
        <div v-for="item in daftarSarana" :key="item.id" class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img :src="item.fotoUrl" :alt="item.nama" class="w-full h-48 object-cover">
          <div class="p-6 text-center flex-grow flex flex-col justify-between">
            <h3 class="text-xl font-bold text-green-800 mb-2">{{ item.nama }}</h3>
            <p class="text-gray-600">Jumlah: {{ item.jumlah }} unit</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const daftarSarana = ref([]);
const loading = ref(true);

const fetchSarana = async () => {
  try {
    const q = query(collection(db, 'sarana'), orderBy('nama', 'asc'));
    const querySnapshot = await getDocs(q);
    daftarSarana.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Gagal mengambil data sarana:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSarana);
</script>