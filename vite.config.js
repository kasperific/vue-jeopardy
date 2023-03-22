import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
    base: '/vue-jeopardy/',
    resolve: {
      alias: {
        vue: '@vue/compat'
      }
    },
    plugins: [
      createVuePlugin({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
    ],
    server: {
      watch: {
        usePolling: true,
      }
    }
  })
  