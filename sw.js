self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      // Adiciona arquivos ao cache durante a instalação
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/icon.png',
        '/list.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna a resposta em cache ou faz uma nova solicitação
      return response || fetch(event.request);
    })
  );
});
