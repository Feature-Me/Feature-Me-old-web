const CACHE_NAME = `feature-me-cache-ver-0.7.0-v1`;

const cacheFiles = [
    "/",
    "./scripts/bundle.js",
    "./favicon"
]

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(cacheFiles);
    })());
    console.log("[Service Worker] installed Service Worker.");
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        try {
            // Try to fetch the resource from the network.
            const fetchResponse = await fetch(event.request);

            // Save the resource in the cache.
            cache.put(event.request, fetchResponse.clone());

            console.log("[Service Worker] updated chache resources.");

            // And return it.
            return fetchResponse;
        } catch (e) {
            console.log("[Service Worker] failed to fetch resources");
            // Fetching didn't work get the resource from the cache.
            const cachedResponse = await cache.match(event.request);

            console.log("[Service Worker] loading from cached resources.");

            // And return it.
            return cachedResponse;
        }
    })());
});