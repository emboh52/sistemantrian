const CACHE_NAME = 'qantri-pwa-v3';

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
      // Mengunduh tiap file secara independen agar 1 file 404 tidak menggagalkan seluruh PWA
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => 
          cache.add(url).catch(err => console.warn('File belum ditemukan saat caching:', url))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});