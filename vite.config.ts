import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import vueDevTools from 'vite-plugin-vue-devtools'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd())

  console.log(` ---- 載入環境變數 ---- `)
  for (const [key, value] of Object.entries(env)) {
    console.log(`${key} = ${value}`);
  }
  console.log(` --------------------- `)

  return {
    base: env.VITE_BASE, // 依照不同環境變數設置不同路徑
    esbuild: {
      drop: ["console", "debugger"], // 移除程式碼內的console.log
    },

    plugins: [vue(), vueDevTools(),],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '/images': 'src/assets/images',
      },
    },
    /** 配置專案服務位址與端口號碼 */
    server: {
      host: env.VITE_SERVER_HOST_NAME,
      port: Number(env.VITE_SERVER_PORT)
    },
  }
})



