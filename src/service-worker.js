// service-worker.js

// 1⃣ Import Firebase SDK scripts
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// 2⃣ Initialize Firebase (replace with your config)
firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
});

// 3⃣ Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// 4⃣ Handle background messages from FCM
messaging.onBackgroundMessage(payload => {
  console.log('[SW][FCM] Received background message:', payload);
  const notification = payload.notification || {};
  const title = notification.title || 'New Notification';
  const options = {
    body: notification.body,
    icon: notification.icon || '/icon-192x192.png',
    data: payload.data
  };
  self.registration.showNotification(title, options);
});

// Cache version placeholders (replaced at build)
const STATIC_CACHE = 'static-__BUILD_HASH__';
const DYNAMIC_CACHE = 'dynamic-__BUILD_HASH__';
// Shell files to precache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/icon-192x192.png',
  '/manifest.webmanifest'
];

// Install: cache shell, then activate immediately
self.addEventListener('install', event => {
  console.log('[SW] Installing, caching shell:', STATIC_CACHE);
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches, claim clients, notify if update
self.addEventListener('activate', event => {
  console.log('[SW] Activating:', STATIC_CACHE);
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const hadOld = keys.includes(STATIC_CACHE);
      // Delete old caches
      await Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
      // Take control
      await self.clients.claim();
      // Notify clients of update only if there was a previous version
      if (hadOld) {
        const clients = await self.clients.matchAll({ includeUncontrolled: true });
        clients.forEach(client => client.postMessage({ type: 'UPDATE_AVAILABLE' }));
      }
    })()
  );
});

// Fetch: handle navigation, shell, and dynamic content
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Network-first for navigations, fallback to shell
  if (req.mode === 'navigate' && req.method === 'GET') {
    event.respondWith(
      fetch(req)
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for shell assets
  if (STATIC_FILES.includes(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req))
    );
    return;
  }

  // Network-first for other requests, cache dynamically
  event.respondWith(
    fetch(req)
      .then(res =>
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(req, res.clone());
          return res;
        })
      )
      .catch(() => caches.match(req))
  );
});

// Handle messages from Angular for local notifications
self.addEventListener('message', event => {
  if (event.data?.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: event.data.icon || '/icon-192x192.png'
    });
  }
});

// Notification click: focus existing client or open new
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = new URL('/', self.location.origin).href;
  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })()
  );
});
