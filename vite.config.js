import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
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
    }),
    pluginRewriteAll()],
  server: {
    watch: {
      usePolling: true,
    }
  },
  base: '/vue-jeopardy/',
  })
  