import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron/renderer';

import { resolve, join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron/main',
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload scripts here
          splash: join(__dirname, 'electron/preload/splash.html'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
    }),
    // Enables use of Node.js API in the Renderer-process
    renderer(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@asset': resolve(__dirname, './src/assets'),
      '@img': resolve(__dirname, './src/assets/images'),
      '@font': resolve(__dirname, './src/assets/fonts'),
      '@lottie': resolve(__dirname, './src/assets/lotties'),
      '@components': resolve(__dirname, './src/components'),
      '@config': resolve(__dirname, './src/config'),
      '@data': resolve(__dirname, './src/data/data.json'),
      '@hook': resolve(__dirname, './src/hooks'),
      '@i18n': resolve(__dirname, './src/i18n'),
      '@nav': resolve(__dirname, './src/navigations'),
      '@screen': resolve(__dirname, './src/screens'),
      '@popup': resolve(__dirname, './src/screens/popups'),
      '@store': resolve(__dirname, './src/stores'),
      '@interface': resolve(__dirname, './src/interfaces'),
      '@constant': resolve(__dirname, './src/constants'),
    },
  },
});
