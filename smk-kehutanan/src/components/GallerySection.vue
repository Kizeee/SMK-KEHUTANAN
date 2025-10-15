<template>
  <section id="galeri" class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Galeri Kegiatan</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">Momen-momen berharga dalam proses belajar mengajar...</p>
        <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div v-if="loading" class="text-center text-gray-600">
        <p>Memuat galeri...</p>
      </div>

      <div v-else-if="galleryItems.length === 0" class="text-center text-gray-500">
        <p>Belum ada foto di galeri.</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="item in galleryItems" :key="item.id" class="relative group overflow-hidden rounded-lg shadow-md">
          <img :src="item.imageUrl" :alt="item.title" class="w-full h-48 object-cover transition-transform group-hover:scale-110 duration-300">
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div class="absolute bottom-0 left-0 p-3 text-white w-full">
            <h3 class="font-semibold text-sm leading-tight">{{ item.title }}</h3>
            <p v-if="item.formattedDate" class="text-xs text-gray-300 mt-1">
              {{ item.formattedDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Variabel reaktif
const galleryItems = ref([]);
const loading = ref(true);

/**
 * FUNGSI BARU: Mengubah objek timestamp Firebase menjadi string tanggal yang mudah dibaca.
 * Contoh: '15 Oktober 2025'
 * @param {object} timestamp - Objek timestamp dari Firestore.
 * @returns {string} - Tanggal yang sudah diformat.
 */
const formatTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.toDate) {
    return null; // Kembalikan null jika data tidak valid
  }
  const date = timestamp.toDate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

// Fungsi untuk mengambil data dari Firestore
const fetchGalleryItems = async () => {
  try {
    const q = query(collection(db, 'galeri'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const items = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Pastikan data memiliki field yang diperlukan
      if (data.imageUrl && data.title && data.createdAt) {
        items.push({ 
          id: doc.id, 
          ...data,
          // Tambahkan properti baru 'formattedDate' ke setiap item
          formattedDate: formatTimestamp(data.createdAt)
        });
      }
    });
    
    galleryItems.value = items;
  } catch (error) {
    console.error("Gagal mengambil data galeri: ", error);
  } finally {
    loading.value = false;
  }
};

// Panggil fungsi saat komponen dimuat
onMounted(() => {
  fetchGalleryItems();
});
</script>