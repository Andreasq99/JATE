const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

const imageCache = new CacheFirst({
  cacheName: 'image-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    }),
  ],
})

warmStrategyCache({
  urls: [
    './icon_96x96.97a96e0fc4eb2a8bec3b8d49d90f1d14.png',
    'icon_128x128.225c312e650131cfe5a2119fd958867e.png',
    'icon_192x192.1efd8d2a5218c9516adb7d6ff7907ac1.png',
    'icon_256x256.873242da1488f53efeaca94de308539e.png',
    'icon_384x384.15214f65c1219e812d779bfcb384494a.png',
    'icon_512x512.3ca11a97eb7d90b61fc3db0f3c5dcdb6.png'
  ],
  strategy: imageCache
});

registerRoute(
  ({ request }) => request.destination === 'image', imageCache);


registerRoute();
