const CACHE = 'neonote-v191';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];


self.addEventListener('install', e => {

  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});


self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all([

      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        )
      ),


      self.clients.claim()
    ])
  );
});


self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});


self.addEventListener('message', e => {
  if (e.data && e.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
