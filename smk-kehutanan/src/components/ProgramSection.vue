<template>
  <section id="program" class="py-20 bg-green-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Program Keahlian</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">Kami menyediakan program keahlian yang dirancang untuk memenuhi kebutuhan industri kehutanan modern</p>
        <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="program-card bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <font-awesome-icon icon="fa-solid fa-tree" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-green-800 mb-4">Teknik Rehabilitasi dan Reklamasi Hutan</h3>
          <p class="text-gray-600 mb-4">Mempelajari teknik pemulihan dan perbaikan kondisi hutan yang rusak</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Konservasi tanah dan air</li>
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Revegetasi lahan kritis</li>
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Pengendalian erosi</li>
          </ul>
        </div>
        <div class="program-card bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <font-awesome-icon icon="fa-solid fa-leaf" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-green-800 mb-4">Teknik Konservasi Sumber Daya Hutan</h3>
          <p class="text-gray-600 mb-4">Fokus pada perlindungan dan pelestarian keanekaragaman hayati</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Pengelolaan kawasan konservasi</li>
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Monitoring satwa liar</li>
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Ekowisata dan pendidikan lingkungan</li>
          </ul>
        </div>
        <div class="program-card bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <font-awesome-icon icon="fa-solid fa-hammer" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-green-800 mb-4">Teknik Produksi Hasil Hutan</h3>
          <p class="text-gray-600 mb-4">Mengolah dan memanfaatkan hasil hutan secara berkelanjutan</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Pengolahan kayu dan non-kayu</li>
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Teknologi pengawetan</li>
            <li class="flex items-center"><font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 mr-2" />Pengembangan produk hasil hutan</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.program-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>