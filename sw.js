// Nome do cache (Controle de versão)
const cachePWA = 'cache-v1'
// Arquivos a serem armazenados em cache
// todos os arquivos deve ser adicionados ao vetor(exeto o manifesto)
const urlsToCache = [
  '/',
  '/index.html', 
  '/style.css',
  '/app.js',
  '/sw.js', 
  '/list.png',
  '/icon.png'
]

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cachePWA)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
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

