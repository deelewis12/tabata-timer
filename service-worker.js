// Bump this version any time you change cached files to force an update.
const CACHE_NAME = 'tabata-timer-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

// Cache-first for app shell files; fall back to network if needed.
self.addEventListener('fetch', event => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
