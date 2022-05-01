self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('solar').then((cache) => cache.addAll([
        '/',
        '/index.html',
        '/index.min.js',
        '/sw.min.js',
        '/css/site.min.css',
        '/assets/logo-trans.png',
        '/assets/mobile/app.jpeg',
        '/assets/mobile/app.webp',
        '/assets/mobile/facade.jpg',
        '/assets/mobile/facade.webp',
        '/assets/mobile/groundpanels2.jpg',
        '/assets/mobile/groundpanels2.webp',
        '/assets/mobile/house.jpg',
        '/assets/mobile/house.webp',
        '/assets/mobile/light.jpg',
        '/assets/mobile/light.webp',
        '/assets/mobile/logo-trans.jpg',
        '/assets/mobile/logo-trans.webp',
        '/assets/mobile/man.jpg',
        '/assets/mobile/man.webp',
        '/assets/mobile/perc-solar.jpg',
        '/assets/mobile/perc-solar.webp',
        '/assets/mobile/photovoltaic.jpg',
        '/assets/mobile/photovoltaic.webp',
        '/assets/mobile/roof.jpg',
        '/assets/mobile/roof.webp',
        '/assets/mobile/solar-cell.jpg',
        '/assets/mobile/solar-cell.webp',
        '/assets/mobile/solar-energy.jpg',
        '/assets/mobile/solar-energy.webp',
        '/assets/mobile/solarpanel-gb0669ea35.jpg',
        '/assets/mobile/solarpanel-gb0669ea35.webp',
        '/assets/web/app.jpeg',
        '/assets/web/app.webp',
        '/assets/web/facade.jpg',
        '/assets/web/facade.webp',
        '/assets/web/groundpanels2.jpg',
        '/assets/web/groundpanels2.webp',
        '/assets/web/house.jpg',
        '/assets/web/house.webp',
        '/assets/web/light.jpg',
        '/assets/web/light.webp',
        '/assets/web/logo-trans.jpg',
        '/assets/web/logo-trans.webp',
        '/assets/web/man.jpg',
        '/assets/web/man.webp',
        '/assets/web/perc-solar.jpg',
        '/assets/web/perc-solar.webp',
        '/assets/web/photovoltaic.jpg',
        '/assets/web/photovoltaic.webp',
        '/assets/web/roof.jpg',
        '/assets/web/roof.webp',
        '/assets/web/solar-cell.jpg',
        '/assets/web/solar-cell.webp',
        '/assets/web/solar-energy.jpg',
        '/assets/web/solar-energy.webp',
        '/assets/web/solarpanel-gb0669ea35.jpg',
        '/assets/web/solarpanel-gb0669ea35.webp'
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });