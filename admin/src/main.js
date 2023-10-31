import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import user from "./plugins/User";
const app = createApp(App)

app
.use(user)
.use(router)

app.config.globalProperties.$storage = window.localStorage;

app.mount('#app')
