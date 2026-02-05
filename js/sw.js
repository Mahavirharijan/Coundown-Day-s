const CACHE_NAME = 'love-countdown-v1';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './css/style.css',
  './js/auth.js',
  './js/card.js',
  './js/pwa.js',
  './js/sw.js',
  './js/unlock.js',
  './data/manifest.json',
  './data/config.json',
  './assets/images/heart.png',
  './assets/images/valentine.jpg',
  './assets/images/rose.jpg',
  './assets/images/chocolate.jpg',
  './assets/images/teddy.jpg',
  './assets/images/hug.jpg',
  './assets/images/kiss.jpg',
  './assets/images/promise.jpg',
  './assets/images/propose.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
