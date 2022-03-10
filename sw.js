const cacheName = 'offline';
const static_assets=[
'./',
'./index.html',
'./manifest.webmanifest',
'./ss.svg',
'./ico.png'
]
// Cache all the files to make a PWA
self.addEventListener('install',async e => {
    const cache=await caches.open(cacheName)
    await cache.addAll(static_assets);
    })


// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
