const CACHE_NAME = 'tabata-v1';
const URLS = ['/', '/index.html', '/chime.mp3'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(URLS)))
);

self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
