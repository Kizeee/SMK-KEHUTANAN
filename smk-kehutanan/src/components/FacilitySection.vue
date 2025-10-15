<template>
  <section id="fasilitas" class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-4">Fasilitas Sekolah</h2>
        <p class="text-gray-700 max-w-2xl mx-auto">Didukung dengan fasilitas modern untuk mendukung proses belajar mengajar yang optimal</p>
        <div class="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="facility-card bg-green-50 p-6 rounded-lg text-center">
          <div class="facility-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="fa-solid fa-flask" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Laboratorium Kehutanan</h3>
          <p class="text-gray-600">Peralatan modern untuk praktikum ilmu kehutanan dan ekologi</p>
        </div>
        <div class="facility-card bg-green-50 p-6 rounded-lg text-center">
          <div class="facility-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="fa-solid fa-laptop" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Lab Komputer</h3>
          <p class="text-gray-600">Fasilitas komputer terkini untuk pembelajaran digital</p>
        </div>
        <div class="facility-card bg-green-50 p-6 rounded-lg text-center">
          <div class="facility-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="fa-solid fa-book" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Perpustakaan</h3>
          <p class="text-gray-600">Koleksi buku kehutanan dan referensi pendidikan lengkap</p>
        </div>
        <div class="facility-card bg-green-50 p-6 rounded-lg text-center">
          <div class="facility-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="fa-solid fa-seedling" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Kebun Pendidikan</h3>
          <p class="text-gray-600">Area praktik untuk budidaya tanaman dan konservasi</p>
        </div>
        <div class="facility-card bg-green-50 p-6 rounded-lg text-center">
          <div class="facility-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="fa-solid fa-tools" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Workshop</h3>
          <p class="text-gray-600">Tempat praktik pengolahan hasil hutan dan keterampilan teknik</p>
        </div>
        <div class="facility-card bg-green-50 p-6 rounded-lg text-center">
          <div class="facility-icon w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="fa-solid fa-basketball-ball" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">Lapangan Olahraga</h3>
          <p class="text-gray-600">Fasilitas olahraga lengkap untuk pengembangan fisik siswa</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.facility-icon {
  transition: all 0.3s ease;
}
.facility-card:hover .facility-icon {
  transform: scale(1.1);
  color: #22c55e;
}
</style>