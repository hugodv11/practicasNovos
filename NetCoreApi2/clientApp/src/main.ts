import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import store from '@/store/index.ts'
require('@/assets/main.scss');

axios.defaults.baseURL = 'https://localhost:44374/api'

const token = store.state.token;
if(token){
  axios.defaults.headers.common['Authorization'] = token
}

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
