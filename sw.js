const cacheName = 'offline';
const static_assets=[
'./',
'./index.html',
'./manifest.webmanifest',
'./ss.svg',
'./ico.png'
]
self.addEventListener('install',async e => {
    const cache=await caches.open(cacheName)
    await cache.addAll(static_assets);
    })


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
