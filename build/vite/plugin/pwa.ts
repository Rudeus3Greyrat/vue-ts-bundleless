/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */

import { VitePWA } from 'vite-plugin-pwa';

export function configPwaConfig(env: ViteEnv) {
  const { VITE_USE_PWA, VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = env;

  if (VITE_USE_PWA) {
    // vite-plugin-pwa
    const pwaPlugin = VitePWA({
      manifest: {
        name: VITE_GLOB_APP_TITLE,
        short_name: VITE_GLOB_APP_SHORT_NAME,
        icons: [
          {
            src: './resource/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './resource/img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cacheId: 'vite-pwa', // 设置前缀
        cleanupOutdatedCaches: true,
        skipWaiting: true, // 强制等待中的 Service Worker 被激活
        clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
        swDest: 'dist/sw.js', // 输出 Service worker 文件
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        // Define runtime caching rules.
        runtimeCaching: [
          {
            // Match any request that ends with .png, .jpg, .jpeg or .svg.
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            // Apply a cache-first strategy.
            handler: 'CacheFirst',
            options: {
              // Use a custom cache name.
              cacheName: 'images',
            },
          },
          {
            urlPattern: /\.(?:js)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js',
            },
          },
          {
            urlPattern: /\.(?:html)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html',
            },
          },
          {
            urlPattern: /\.(?:wav|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'others',
            },
          },
        ],
      },
    });
    return pwaPlugin;
  }
  return [];
}
