const CACHE_NAME = 'love-countdown-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/css/style.css',
  '/js/auth.js',
  '/js/card.js',
  '/js/pwa.js',
  '/js/sw.js',
  '/js/unlock.js',
  '/data/manifest.json',
  '/assets/images/heart.png',
  '/assets/images/icon-192.png',
  '/assets/images/icon-512.png',
  '/assets/images/rose.jpg',
  '/assets/music/rose_day.mp3',
  '/assets/video/scooty.mp4'
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
