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
<<<<<<< HEAD
    caches.match(event.request).then((response) => {
      // Retorna a resposta em cache ou faz uma nova solicitação
      return response || fetch(event.request);
    })
  );
});
=======
    caches.open(cachePWA)
      .then((cache) => {
        return cache.match(event.request)
          .then((response) => {
            // Se o arquivo está no cache, serve o arquivo do cache
            if (response) {
              return response;
            }

            // Caso contrário, faz uma solicitação de rede
            return fetch(event.request)
              .then((networkResponse) => {
                // Se a solicitação for bem-sucedida, armazena a resposta em cache
                if (networkResponse.ok) {
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                // Se a solicitação falhar, retorna uma resposta padrão
                // Ou uma página de erro personalizada
                return new Response('Você está offline', {
                  status: 503,
                  statusText: 'Offline'
                });
              });
          });
      })
  );
});

>>>>>>> 62cd157381714193789feeaa9f1fc9ef6a43a1a8
