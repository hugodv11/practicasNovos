import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
require('@/assets/main.scss');

axios.defaults.baseURL = 'https://localhost:44374/api'

createApp(App)
  .use(router)
  .mount("#app");
