import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import user from "./plugins/User";
import notif from "./plugins/Notif";
import axios from 'axios';

const app = createApp(App)

app
.use(user)
.use(notif)
.use(router)

axios.interceptors.request.use((config) => {
	config.headers['x-sid-token'] = app.config.globalProperties.$user.data.sessionId;
	return config;
});

app.config.globalProperties.$storage = window.localStorage;
app.config.globalProperties.$axios = axios;

app.mount('#app')
