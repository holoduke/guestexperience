const STATIC_CACHE = 'static-__BUILD_HASH__';
const DYNAMIC_CACHE = 'dynamic-__BUILD_HASH__';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
  '/icon-192x192.png',
  '/manifest.webmanifest'
];

// Install event: pre-cache static files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...',STATIC_CACHE);
  self.skipWaiting(); // Activate immediately after install
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate event: clean up old caches and notify client
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...',STATIC_CACHE);
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );

      // Take control of uncontrolled clients
      await self.clients.claim();

      // Notify all open clients of update
      const allClients = await self.clients.matchAll({ includeUncontrolled: true });
      for (const client of allClients) {
        client.postMessage({ type: 'UPDATE_AVAILABLE' });
      }
    })()
  );
});

// Fetch event: handle static + dynamic caching
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Use cache-first strategy for static assets
  if (STATIC_FILES.includes(requestUrl.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  // Network-first for everything else (e.g., API)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Handle messages from Angular for local notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: event.data.icon || '/assets/icons/icon-192x192.png'
    });
  }
});
