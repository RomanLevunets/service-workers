const staticCacheName = 'site-static'
const assets = [
  '/',
  '/index.html',
  '/index.js',
  'index.css',
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'https://jsonplaceholder.typicode.com/posts?_limit=20'
]

// install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets)
    })
  )
})

// activate
self.addEventListener('activate', event => {
  console.log('activate', event);
})

// fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request)
    })
  )
})
