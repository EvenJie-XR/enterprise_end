import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "virtual:svg-icons-register";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.scss'
// @ts-ignore 实现element的国际化为中文
import zhCn from 'element-plus/dist/locale/zh-cn'
import { createPinia } from 'pinia'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.locale('zh-cn') // 使用本地化语言

// 批量注册element的icons
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia()

app
.use(router)
.use(pinia)
.use(ElementPlus, { 
  locale: zhCn, // 设置element的国际化为中文
})
.mount('#app')
