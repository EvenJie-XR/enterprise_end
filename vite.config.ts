import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    // 使用node处理src/svgs用于实现SVGIcon组件
    createSvgIconsPlugin({
      // 指定目录
      iconDirs: [path.resolve(process.cwd(), "src/svgs")],
      // 使用svg图标的格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://43.136.114.250:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/mock': {
        target: 'https://mock.apifox.com/m1/3616952-0-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, ''),
      }
    },
  }
})
