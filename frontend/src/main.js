// vue & pinia;
import { createApp } from 'vue'
import { createPinia } from 'pinia';


// app & router
import App from './App.vue';
import router from './router';

// css global
import './css/global.css';

// layouts
import DefaultLayout from './layouts/DefaultLayout.vue';
import NavbarLayout from './layouts/NavbarLayout.vue';

// libs
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// instâncias & configurações
const app = createApp(App);

const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
};

app
  .use(router)
  .use(createPinia())
  .use(Toast, toastOptions)
  .component('default-layout', DefaultLayout)
  .component('navbar-layout', NavbarLayout)
  .mount('#app')