import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      // cache: false,
    }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240, // 压缩限制
    }),
    visualizer({
      open: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  /* css: {
    preprocessorOptions: {
      less: { // 静态自定义样式
        modifyVars: {
          'primary-color': 'green',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  }, */
  server: {
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523', // dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true, // css 拆分
    sourcemap: false, // 不生成sourcemap
    minify: 'terser', // 是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
    assetsInlineLimit: 5000, // 小于该值 图片将打包成Base64
    terserOptions: {
      compress: {
        // 生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // 两种方式
      // 一，也可以指定包名打包
      output: {
        manualChunks: {
          'ant-design-vue': ['ant-design-vue'],
          '@antv/data-set': ['@antv/data-set'],
          '@antv/g2': ['@antv/g2'],
          '@antv/g2plot': ['@antv/g2plot'],
        },
      },
      // 二，自动分割包名输出 chunkSizeWarningLimit 配置大小
      /* output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/static/[name]-[hash].[ext]',
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
          return '';
        },
      }, */
    },
  },
});
