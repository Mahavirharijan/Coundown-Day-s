const CACHE_NAME = 'love-countdown-v1';
const urlsToCache = [
  '/Coundown-Day-s/',
  '/Coundown-Day-s/index.html',
  '/Coundown-Day-s/dashboard.html',
  '/Coundown-Day-s/css/style.css',
  '/Coundown-Day-s/js/auth.js',
  '/Coundown-Day-s/js/card.js',
  '/Coundown-Day-s/js/pwa.js',
  '/Coundown-Day-s/js/sw.js',
  '/Coundown-Day-s/js/unlock.js',
  '/Coundown-Day-s/data/manifest.json',
  '/Coundown-Day-s/data/config.json'
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
});
