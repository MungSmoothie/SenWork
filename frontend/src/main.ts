import { createApp } from 'vue'
import 'element-plus/theme-chalk/src/index.scss'
import './style.css'
import './assets/theme.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
