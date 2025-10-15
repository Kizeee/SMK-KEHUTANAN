<script setup>
import { reactive, computed, ref } from 'vue';
import AnimatedSection from './AnimatedSection.vue';

// Definisikan semua informasi kontak di sini agar mudah diubah
const contactInfo = ref({
  // URL ini akan membuka pencarian Google Maps untuk lokasi sekolah
  googleMapsUrl: 'https://maps.app.goo.gl/GRdByiTTqs8ZRV1a7',
  
  details: [
    // DIUBAH: Alamat sekarang menjadi bagian dari daftar ini
    { 
      icon: 'fa-solid fa-map-marker-alt', 
      text: 'Jl. Suka Karya No.KM. 11 5, Tuah Karya, Kec. Tampan, Kota Pekanbaru', 
      href: 'http://googleusercontent.com/maps.google.com/7' // Link ke Google Maps
    },
    { icon: 'fa-solid fa-phone', text: '(0761) 123-456', href: 'tel:+62761123456' },
    { icon: 'fa-solid fa-envelope', text: 'info@smkkehutanan-pku.sch.id', href: 'mailto:info@smkkehutanan-pku.sch.id' },
    { icon: 'fa-brands fa-instagram', text: 'smkhutnegeri.pku', href: 'https://www.instagram.com/smkhutnegeri.pku?igsh=MXRuNHAxdHdrOXI5ZA==' },
    { icon: 'fa-brands fa-youtube', text: 'SMK Kehutanan Negeri Pekanbaru Official', href: 'https://youtube.com/@smkkehutanannegeripekanbaru?si=2MMxKB3KwYORUmYT' },
    { icon: 'fa-brands fa-facebook', text: 'SMK Kehutanan Negeri Pekanbaru', href: 'https://www.facebook.com/smkknpekanbaru/?locale=id_ID' },
  ],
});

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const isFormValid = computed(() => {
  return form.name.trim() !== '' && /^\S+@\S+\.\S+$/.test(form.email) && form.message.trim() !== '';
});

function handleSubmit() {
  if (isFormValid.value) {
    alert(`Terima kasih, ${form.name}! Pesan Anda telah kami terima.`);
    form.name = '';
    form.email = '';
    form.message = '';
  }
}
</script>

<template>
  <section id="kontak" class="py-20 bg-green-50">
    <div class="container mx-auto px-6">
      <AnimatedSection>
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Hubungi Kami</h2>
          <p class="text-gray-700 max-w-2xl mx-auto">Kami siap menjawab pertanyaan dan memberikan informasi lebih lanjut</p>
          <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
        </div>
      </AnimatedSection>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <AnimatedSection>
          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-bold text-green-800 mb-4">Kontak & Lokasi</h3>
            </div>
            
            <ul class="space-y-4">
              <li v-for="item in contactInfo.details" :key="item.text" class="flex items-start">
                <font-awesome-icon :icon="item.icon" class="text-green-600 text-xl w-6 mr-4 mt-1" />
                <a :href="item.href" target="_blank" class="text-gray-700 hover:text-green-600 transition-colors leading-relaxed">{{ item.text }}</a>
              </li>
            </ul>
          </div>
        </AnimatedSection>
        
        <AnimatedSection>
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-green-800 mb-6">Kirim Pesan</h3>
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input v-model="form.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input v-model="form.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                <textarea v-model="form.message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
              </div>
              <button 
                type="submit" 
                :disabled="!isFormValid"
                class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
</template>