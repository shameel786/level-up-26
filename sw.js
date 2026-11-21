const CACHE_NAME = 'levelup-26-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo_192x192_transparent.png',
  './assets/logo_512x512_transparent.png',
  './assets/logo_1024x1024_transparent.jpg'
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
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});