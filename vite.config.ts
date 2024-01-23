import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 使用node处理src/svgs用于实现SVGIcon组件
    createSvgIconsPlugin({
      // 指定目录
      iconDirs: [path.resolve(process.cwd(), "src/svgs")],
      // 使用svg图标的格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
})
