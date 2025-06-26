import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // Слушать все интерфейсы
    port: 5173,       // Явное указание порта
    // allowedHosts: ['admin.physcon.my', 'localhost'],
    allowedHosts: true,
    strictPort: true, // Не пытаться искать свободный порт
    // hmr: {
    //   overlay: false  // Отключаем overlay-уведомления в браузере
    // },
    // // Решение для ошибки с allowedHosts:
    // cors: true,       // Разрешить все CORS-запросы
    // headers: {
    //   "Access-Control-Allow-Origin": "*",  // Явно разрешаем все домены
    // }
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})





