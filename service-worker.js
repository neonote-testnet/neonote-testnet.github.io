const CACHE = 'neonote-v354';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];


self.addEventListener('install', event => {
  
});


self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});


self.addEventListener('message', event => {
  if (event.data?.action === 'APPLY_UPDATE') {
    event.waitUntil(applyLatestUpdate());
    self.skipWaiting();
  }
});

async function applyLatestUpdate() {

  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));

  const cache = await caches.open(CACHE);

  await cache.addAll([
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
  ]);
}

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

  

