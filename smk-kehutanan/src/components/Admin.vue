<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg relative">
      <button @click="handleLogout" class="absolute top-4 right-4 text-sm text-gray-500 hover:text-red-600 hover:underline">Logout</button>
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-green-800">Admin Panel</h1>
        <p class="text-gray-600">Manajemen Konten Website</p>
      </div>

      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          <button @click="activeTab = 'slider'" :class="['tab-button', { 'tab-active': activeTab === 'slider' }]">Slider</button>
          <button @click="activeTab = 'berita'" :class="['tab-button', { 'tab-active': activeTab === 'berita' }]">Berita</button>
          <button @click="activeTab = 'galeri'" :class="['tab-button', { 'tab-active': activeTab === 'galeri' }]">Galeri</button>
          <button @click="activeTab = 'guru'" :class="['tab-button', { 'tab-active': activeTab === 'guru' }]">Guru</button>
          <button @click="activeTab = 'sarana'" :class="['tab-button', { 'tab-active': activeTab === 'sarana' }]">Sarana</button>
        </nav>
      </div>

      <div v-if="activeTab === 'slider'">
        <form @submit.prevent="handleSubmit('slider')" class="mb-12 p-4 border rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ editMode ? 'Edit Slide' : 'Tambah Slide Baru' }}</h2>
          <div class="mb-4">
            <label class="form-label">Judul Slide (cth: `Teks <span class='text-green-300'>Berwarna</span>`)</label>
            <input type="text" v-model="slider.title" class="form-input" required>
          </div>
          <div class="mb-4">
            <label class="form-label">Subjudul Slide</label>
            <input type="text" v-model="slider.subtitle" class="form-input" required>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="form-label">Urutan (Angka)</label>
              <input type="number" v-model="slider.order" class="form-input" required>
            </div>
            <div>
              <label :for="`sliderFile`" class="form-label">Gambar Latar (Kosongkan jika tidak ubah)</label>
              <input type="file" @change="handleFileChange($event, 'slider')" :id="`sliderFile`" class="form-file-input">
            </div>
          </div>
          <div class="flex space-x-3">
            <button type="submit" :disabled="loading" class="form-button flex-grow">
              {{ loading ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Tambah Slide') }}
            </button>
            <button v-if="editMode" @click="cancelEdit" type="button" class="cancel-button">Batal</button>
          </div>
        </form>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Daftar Slide Saat Ini</h2>
        <div v-if="loadingData" class="text-center">Memuat daftar slide...</div>
        <div v-else class="space-y-4 max-h-96 overflow-y-auto pr-2">
           <div v-for="item in daftarSlider" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center min-w-0">
                <img :src="item.imageUrl" class="w-20 h-12 object-cover rounded mr-4 flex-shrink-0">
                <div class="min-w-0">
                  <p class="font-semibold text-gray-800 truncate" v-html="item.title"></p>
                  <p class="text-xs text-gray-500">Urutan: {{ item.order }}</p>
                </div>
              </div>
              <div class="flex space-x-3 flex-shrink-0 ml-4">
                <button @click="startEdit(item, 'slider')" class="text-sm text-blue-600 hover:underline">Edit</button>
                <button @click="handleDelete('hero_slider', item.id)" class="text-sm text-red-600 hover:underline">Hapus</button>
              </div>
            </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'berita'">
        <form @submit.prevent="handleSubmit('berita')" class="mb-12 p-4 border rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ editMode ? 'Edit Berita' : 'Tambah Berita Baru' }}</h2>
          <div class="mb-4">
            <label for="beritaJudul" class="form-label">Judul Berita</label>
            <input type="text" v-model="berita.judul" id="beritaJudul" class="form-input" required>
          </div>
          <div class="mb-4">
            <label class="form-label">Isi Berita</label>
            <editor
              api-key="0vnn6hz1gw2m01vdpnvaerc6ouzicgi0sgdcgfmba4ye24vd"
              v-model="berita.isi"
              :init="{
                height: 300, menubar: false,
                plugins: ['lists link image paste help wordcount'],
                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help'
              }"
            />
          </div>
          <div class="mb-4">
            <label :for="`beritaFile`" class="form-label">Gambar Utama (Kosongkan jika tidak ingin mengubah)</label>
            <input type="file" @change="handleFileChange($event, 'berita')" :id="`beritaFile`" class="form-file-input">
          </div>
          <div class="flex space-x-3">
            <button type="submit" :disabled="loading" class="form-button flex-grow">
              {{ loading ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Terbitkan Berita') }}
            </button>
            <button v-if="editMode" @click="cancelEdit" type="button" class="cancel-button">Batal</button>
          </div>
        </form>

        <h2 class="text-xl font-semibold text-gray-800 mb-4">Daftar Berita Terbit</h2>
        <div v-if="loadingData" class="text-center">Memuat daftar berita...</div>
        <div v-else class="space-y-4 max-h-96 overflow-y-auto pr-2">
           <div v-for="item in daftarBerita" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center min-w-0">
                <img :src="item.imageUrl" class="w-16 h-12 object-cover rounded mr-4 flex-shrink-0">
                <p class="font-semibold text-gray-800 truncate">{{ item.judul }}</p>
              </div>
              <div class="flex space-x-3 flex-shrink-0 ml-4">
                <button @click="startEdit(item, 'berita')" class="text-sm text-blue-600 hover:underline">Edit</button>
                <button @click="handleDelete('berita', item.id)" class="text-sm text-red-600 hover:underline">Hapus</button>
              </div>
            </div>
        </div>
      </div>

      <div v-if="activeTab === 'galeri'">
        <form @submit.prevent="handleSubmit('galeri')" class="mb-12 p-4 border rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ editMode ? 'Edit Item Galeri' : 'Unggah Gambar Baru' }}</h2>
          <div class="mb-4">
            <label for="galeriTitle" class="form-label">Judul Gambar</label>
            <input type="text" v-model="galeri.title" id="galeriTitle" class="form-input" required>
          </div>
          <div class="mb-4">
            <label :for="`galeriFile`" class="form-label">Pilih Gambar (Kosongkan jika tidak ingin mengubah)</label>
            <input type="file" @change="handleFileChange($event, 'galeri')" :id="`galeriFile`" class="form-file-input">
          </div>
          <div class="flex space-x-3">
            <button type="submit" :disabled="loading" class="form-button flex-grow">
              {{ loading ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Unggah ke Galeri') }}
            </button>
            <button v-if="editMode" @click="cancelEdit" type="button" class="cancel-button">Batal</button>
          </div>
        </form>

        <h2 class="text-xl font-semibold text-gray-800 mb-4">Galeri Saat Ini</h2>
        <div v-if="loadingData" class="text-center">Memuat galeri...</div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
          <div v-for="item in daftarGaleri" :key="item.id" class="relative group">
            <img :src="item.imageUrl" :alt="item.title" class="w-full h-32 object-cover rounded-lg">
            <div class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <p class="text-white text-center text-sm mb-2 px-1">{{ item.title }}</p>
              <div class="flex space-x-3">
                <button @click="startEdit(item, 'galeri')" class="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded">Edit</button>
                <button @click="handleDelete('galeri', item.id)" class="text-xs text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'guru'">
        <form @submit.prevent="handleSubmit('guru')" class="mb-12 p-4 border rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ editMode ? 'Edit Data Guru' : 'Tambah Data Guru Baru' }}</h2>
          <div class="mb-4">
            <label for="guruNama" class="form-label">Nama Lengkap & Gelar</label>
            <input type="text" v-model="guru.nama" id="guruNama" class="form-input" required>
          </div>
          <div class="mb-4">
            <label for="guruJabatan" class="form-label">Jabatan / Bidang</label>
            <input type="text" v-model="guru.jabatan" id="guruJabatan" class="form-input" required>
          </div>
          <div class="mb-4">
            <label :for="`guruFile`" class="form-label">Pilih Foto (Kosongkan jika tidak ingin mengubah)</label>
            <input type="file" @change="handleFileChange($event, 'guru')" :id="`guruFile`" class="form-file-input">
          </div>
          <div class="flex space-x-3">
            <button type="submit" :disabled="loading" class="form-button flex-grow">
              {{ loading ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Tambah Guru') }}
            </button>
            <button v-if="editMode" @click="cancelEdit" type="button" class="cancel-button">Batal</button>
          </div>
        </form>
        
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Daftar Guru Saat Ini</h2>
        <div v-if="loadingData" class="text-center">Memuat daftar guru...</div>
        <div v-else class="space-y-4 max-h-96 overflow-y-auto pr-2">
          <div v-for="guruData in daftarGuru" :key="guruData.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
            <div class="flex items-center min-w-0">
              <img :src="guruData.fotoUrl" :alt="guruData.nama" class="w-12 h-12 rounded-full object-cover mr-4 flex-shrink-0">
              <div class="min-w-0">
                <p class="font-semibold text-gray-800 truncate">{{ guruData.nama }}</p>
                <p class="text-sm text-gray-600 truncate">{{ guruData.jabatan }}</p>
              </div>
            </div>
            <div class="flex space-x-3 flex-shrink-0 ml-4">
              <button @click="startEdit(guruData, 'guru')" class="text-sm text-blue-600 hover:underline">Edit</button>
              <button @click="handleDelete('guru', guruData.id)" class="text-sm text-red-600 hover:underline">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'sarana'">
        <form @submit.prevent="handleSubmit('sarana')" class="mb-12 p-4 border rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ editMode ? 'Edit Sarana' : 'Tambah Sarana Baru' }}</h2>
          <div class="mb-4">
            <label class="form-label">Nama Sarana / Prasarana</label>
            <input type="text" v-model="sarana.nama" class="form-input" required>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="form-label">Jumlah (Unit)</label>
              <input type="number" v-model="sarana.jumlah" class="form-input" required>
            </div>
            <div>
              <label :for="`saranaFile`" class="form-label">Foto (Kosongkan jika tidak ubah)</label>
              <input type="file" @change="handleFileChange($event, 'sarana')" :id="`saranaFile`" class="form-file-input">
            </div>
          </div>
          <div class="flex space-x-3">
            <button type="submit" :disabled="loading" class="form-button flex-grow">
              {{ loading ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Tambah Sarana') }}
            </button>
            <button v-if="editMode" @click="cancelEdit" type="button" class="cancel-button">Batal</button>
          </div>
        </form>

        <h2 class="text-xl font-semibold text-gray-800 mb-4">Daftar Sarana Saat Ini</h2>
        <div v-if="loadingData" class="text-center">Memuat daftar sarana...</div>
        <div v-else class="space-y-4 max-h-96 overflow-y-auto pr-2">
           <div v-for="item in daftarSarana" :key="item.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center min-w-0">
                <img :src="item.fotoUrl" class="w-16 h-12 object-cover rounded mr-4 flex-shrink-0">
                <div class="min-w-0">
                  <p class="font-semibold text-gray-800 truncate">{{ item.nama }}</p>
                  <p class="text-xs text-gray-500">Jumlah: {{ item.jumlah }}</p>
                </div>
              </div>
              <div class="flex space-x-3 flex-shrink-0 ml-4">
                <button @click="startEdit(item, 'sarana')" class="text-sm text-blue-600 hover:underline">Edit</button>
                <button @click="handleDelete('sarana', item.id)" class="text-sm text-red-600 hover:underline">Hapus</button>
              </div>
            </div>
        </div>
      </div>
      
      <p v-if="statusMessage" class="mt-4 text-center text-sm" :class="isError ? 'text-red-600' : 'text-green-600'">{{ statusMessage }}</p>
      <div class="text-center mt-6">
        <router-link to="/" class="text-sm text-green-600 hover:underline">← Kembali ke Website Utama</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';
import Editor from '@tinymce/tinymce-vue';

// --- KONFIGURASI ---
const CLOUDINARY_CLOUD_NAME = "dnx2ak3mq";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

// --- STATE MANAGEMENT ---
const router = useRouter();
const activeTab = ref('slider');
const loading = ref(false); 
const loadingData = ref(false);
const statusMessage = ref('');
const isError = ref(false);

// State untuk setiap form
const slider = ref({ title: '', subtitle: '', order: 1, file: null });
const berita = ref({ judul: '', isi: '', file: null });
const galeri = ref({ title: '', file: null });
const guru = ref({ nama: '', jabatan: '', file: null });
const sarana = ref({ nama: '', jumlah: 1, file: null });

// State untuk setiap daftar data
const daftarSlider = ref([]);
const daftarBerita = ref([]);
const daftarGaleri = ref([]);
const daftarGuru = ref([]);
const daftarSarana = ref([]);

const editMode = ref(false);
const editingId = ref(null);

// --- FUNGSI-FUNGSI UTAMA ---
const handleLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error("Gagal logout:", error);
  }
};

const fetchData = async (type) => {
  const collectionName = type === 'slider' ? 'hero_slider' : type;
  const stateMap = {
    slider: { list: daftarSlider, orderByField: 'order', orderDirection: 'asc' },
    berita: { list: daftarBerita, orderByField: 'createdAt', orderDirection: 'desc' },
    galeri: { list: daftarGaleri, orderByField: 'createdAt', orderDirection: 'desc' },
    guru: { list: daftarGuru, orderByField: 'createdAt', orderDirection: 'asc' },
    sarana: { list: daftarSarana, orderByField: 'nama', orderDirection: 'asc' },
  };

  const { list, orderByField, orderDirection } = stateMap[type];
  loadingData.value = true;
  try {
    const q = query(collection(db, collectionName), orderBy(orderByField, orderDirection));
    const querySnapshot = await getDocs(q);
    list.value = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error(`Gagal mengambil data ${type}:`, error);
  } finally {
    loadingData.value = false;
  }
};

const startEdit = (data, type) => {
  editMode.value = true;
  editingId.value = data.id;
  if (type === 'slider') slider.value = { title: data.title, subtitle: data.subtitle, order: data.order, file: null };
  if (type === 'guru') guru.value = { nama: data.nama, jabatan: data.jabatan, file: null };
  if (type === 'galeri') galeri.value = { title: data.title, file: null };
  if (type === 'berita') berita.value = { judul: data.judul, isi: data.isi, file: null };
  if (type === 'sarana') sarana.value = { nama: data.nama, jumlah: data.jumlah, file: null };
  window.scrollTo(0, 0);
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  slider.value = { title: '', subtitle: '', order: 1, file: null };
  berita.value = { judul: '', isi: '', file: null };
  galeri.value = { title: '', file: null };
  guru.value = { nama: '', jabatan: '', file: null };
  sarana.value = { nama: '', jumlah: 1, file: null };
  ['sliderFile', 'beritaFile', 'galeriFile', 'guruFile', 'saranaFile'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = null;
  });
};

const handleFileChange = (event, type) => {
  const file = event.target.files[0];
  if (type === 'slider') slider.value.file = file;
  if (type === 'berita') berita.value.file = file;
  if (type === 'galeri') galeri.value.file = file;
  if (type === 'guru') guru.value.file = file;
  if (type === 'sarana') sarana.value.file = file;
};

const handleDelete = async (collectionName, id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
  const type = collectionName === 'hero_slider' ? 'slider' : collectionName;
  try {
    await deleteDoc(doc(db, collectionName, id));
    statusMessage.value = '✅ Data berhasil dihapus.';
    fetchData(type);
  } catch (error) {
    statusMessage.value = `❌ Gagal menghapus data: ${error.message}`;
  }
};

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error.message);
  return data.secure_url;
};

const handleSubmit = async (type) => {
  const collectionName = type === 'slider' ? 'hero_slider' : type;
  loading.value = true;
  statusMessage.value = 'Memproses...';

  try {
    const isEditing = editMode.value;
    let currentData, dataToSubmit;
    
    switch (type) {
      case 'slider':
        currentData = slider.value;
        dataToSubmit = { title: currentData.title, subtitle: currentData.subtitle, order: Number(currentData.order) };
        break;
      case 'berita':
        currentData = berita.value;
        dataToSubmit = { judul: currentData.judul, isi: currentData.isi };
        break;
      case 'galeri':
        currentData = galeri.value;
        dataToSubmit = { title: currentData.title };
        break;
      case 'guru':
        currentData = guru.value;
        dataToSubmit = { nama: currentData.nama, jabatan: currentData.jabatan };
        break;
      case 'sarana':
        currentData = sarana.value;
        dataToSubmit = { nama: currentData.nama, jumlah: Number(currentData.jumlah) };
        break;
    }

    const docRef = isEditing ? doc(db, collectionName, editingId.value) : collection(db, collectionName);

    if (currentData.file) {
      const imageUrl = await uploadToCloudinary(currentData.file);
      const imageUrlField = (type === 'guru' || type === 'sarana') ? 'fotoUrl' : 'imageUrl';
      dataToSubmit[imageUrlField] = imageUrl;
    } else if (!isEditing) {
      // Izinkan data baru tanpa file HANYA untuk galeri (jika diperlukan, tapi sebaiknya tidak)
      if (type !== 'galeri' && type !== 'guru' && type !== 'sarana' && type !== 'berita' && type !== 'slider') {
         throw new Error("File wajib diisi untuk data baru.");
      }
      // Logika di atas salah, kita perbaiki:
      // File wajib untuk data baru, KECUALI mode edit
      if (!isEditing) {
        throw new Error("File wajib diisi untuk data baru.");
      }
    }

    if (isEditing) {
      await updateDoc(docRef, dataToSubmit);
      statusMessage.value = `✅ Data ${type} berhasil diperbarui.`;
    } else {
      // Hanya tambahkan createdAt jika bukan slider
      if (type !== 'slider') { 
        dataToSubmit.createdAt = serverTimestamp();
      }
      await addDoc(docRef, dataToSubmit);
      statusMessage.value = `✅ Data ${type} baru berhasil ditambahkan.`;
    }

    fetchData(type);
    cancelEdit();
    
  } catch (error) {
    statusMessage.value = `❌ Gagal: ${error.message}`;
  } finally {
    loading.value = false;
  }
};

watch(activeTab, (newTab) => {
  cancelEdit();
  fetchData(newTab);
}, { immediate: true });
</script>

<style scoped>
.form-label { @apply block text-sm font-medium text-gray-700 mb-2; }
.form-input { @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500; }
.form-file-input { @apply w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200; }
.form-button { @apply bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:bg-gray-400; }
.cancel-button { @apply bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors; }
.tab-button { @apply whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300; }
.tab-active { @apply border-green-500 text-green-600; }
</style>