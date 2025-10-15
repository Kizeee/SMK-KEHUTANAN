// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

/* TAMBAHKAN KODE FONT AWESOME DI BAWAH INI */

// 1. Impor library inti
import { library } from '@fortawesome/fontawesome-svg-core';

// 2. Impor komponen ikon Vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 3. Impor ikon spesifik yang ingin Anda gunakan
import { faTree, faLeaf, faHammer, faFlask, faLaptop, faBook, faSeedling, faTools, faBasketballBall, faMapMarkerAlt, faPhone, faEnvelope, faClock, faUsers, faCheckCircle, faBars } from '@fortawesome/free-solid-svg-icons';

// 4. Tambahkan ikon-ikon tersebut ke library
library.add(faTree, faLeaf, faHammer, faFlask, faLaptop, faBook, faSeedling, faTools, faBasketballBall, faMapMarkerAlt, faPhone, faEnvelope, faClock, faUsers, faCheckCircle, faBars);

/* AKHIR DARI KODE FONT AWESOME */

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon); // <-- Daftarkan komponen secara global
app.mount('#app');