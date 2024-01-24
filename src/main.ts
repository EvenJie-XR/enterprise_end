import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "virtual:svg-icons-register";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.scss'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(ElementPlus).mount('#app')
