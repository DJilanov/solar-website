self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('fox-store').then((cache) => cache.addAll([
        '/index.html',
        '/pindex.min.js',
        '/css/site.min.css',
        '/pwa-examples/a2hs/images/fox1.jpg',
        '/assets/',
        '/fonts/'
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });