// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faTree,
  faLeaf,
  faHammer,
  faFlask,
  faLaptop,
  faBook,
  faSeedling,
  faTools,
  faBasketballBall,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faUsers,
  faCheckCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTree,
  faLeaf,
  faHammer,
  faFlask,
  faLaptop,
  faBook,
  faSeedling,
  faTools,
  faBasketballBall,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faUsers,
  faCheckCircle,
  faBars
);

const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
