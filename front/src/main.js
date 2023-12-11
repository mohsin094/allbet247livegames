import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap"
import '@/assets/scss/main.scss';

import { useDark, useToggle } from '@vueuse/core'
import { plugin, defaultConfig } from '@formkit/vue'
import { isMobile,isTablet } from 'mobile-device-detect';
import axios from 'axios'
import User from "@/plugins/User.js";
import PrimeVue from 'primevue/config';
import  { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const app = createApp(App)
app.config.globalProperties.isDark = useDark({
  selector: "body",
  attribute: "data-bs-theme",
  valueDark: "dark",
  valueLight: "dark",
});


app
.use(router)
.use(plugin, defaultConfig)
.use(User)
.use(PrimeVue)
.use(useLoading)

axios.interceptors.request.use((config) => {
	config.headers['x-sid-token'] = app.config.globalProperties.$user.data.sessionId;
	return config;
});
//The dark mode is always on, remove this line to toggle it
app.config.globalProperties.isDark = true;
app.config.globalProperties.isGuest = false;
app.config.globalProperties.toggleDark = useToggle(app.config.globalProperties.isDark)
app.config.globalProperties.isMobile = isMobile;
app.config.globalProperties.isTablet = isTablet;
app.config.globalProperties.$axios = axios
app.config.globalProperties.$storage = window.localStorage
app.config.globalProperties.$loader = useLoading();
app.mount('#app')
