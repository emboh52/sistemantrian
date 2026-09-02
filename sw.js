const CACHE_NAME = 'qantri-pwa-v2'; // Naikkan versi agar browser memperbarui cache

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './register.html',
  './display.html',
  './dashboard.html',
  './manifest.json',
  './image/icon-192.png',
  './image/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});