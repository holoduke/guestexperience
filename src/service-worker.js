const STATIC_CACHE = 'static-__BUILD_HASH__';
const DYNAMIC_CACHE = 'dynamic-__BUILD_HASH__';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
  '/icon-192.png',
  '/manifest.webmanifest'
];


// 1⃣ Import Firebase SDK scripts
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// 2⃣ Initialize Firebase
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
    data: payload.data // optional: pass-through data for click handler
  };
  self.registration.showNotification(title, options);
});

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
    console.log('[Service Worker] Activating...', STATIC_CACHE);
    event.waitUntil(
      (async () => {
        // Clean old caches
        const keys = await caches.keys();
        await Promise.all(
          keys.map((key) => {
            if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
              console.log('[Service Worker] Deleting old cache:', key);
              return caches.delete(key);
            }
          })
        );
  
        // Claim control so new SW takes effect immediately
        await self.clients.claim();
  
        // Notify all clients that a new version is available
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
    console.log('[Service Worker] Received message:', event.data);
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: event.data.icon || './icon-192.png'
    });
  }
});

self.addEventListener('notificationclick', event => {
    event.notification.close(); // close the notification
  
    // Define the URL you want to open—usually your app’s root
    const urlToOpen = new URL('/', self.location.origin).href;
  
    event.waitUntil(
      // Get all the Window clients under this service worker’s control
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        // Try to find an open window/tab for the URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If no existing window, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
    );
  });
