const CACHE_NAME = 'multitools-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/images/logo.png',
    '/images/favicon.ico',
    '/manifest.json',
    '/offline.html',
    // Add more assets to cache
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch Event Strategy: Cache First, then Network
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If both cache and network fail, return offline page for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// Push Notification handling
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/images/icon-192x192.png',
        badge: '/images/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Tools',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/xmark.png'
            },
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Multi-Tools Hub', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper function for background sync
async function syncData() {
    try {
        // Implement your sync logic here
        const offlineData = await getOfflineData();
        await sendDataToServer(offlineData);
        await clearOfflineData();
    } catch (error) {
        console.error('Sync failed:', error);
    }
} 