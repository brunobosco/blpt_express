const filesToCache = ['/', 'main.css', 'main.js', 'index.html', '404.html', 'works.html', 'about.html', 'poster.html'];
const staticCacheName = 'cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        // caches.open(staticCacheName).then((cache) => {
        //     return cache.addAll(filesToCache);
        // })
        caches.delete(filesToCache)
    );
    // self.skipWaiting();
});

// self.addEventListener('fetch', (event) => {
//     if (!event.request.url.startsWith('http')) return;

//     event.respondWith(
//         caches
//             .match(event.request)
//             .then((response) => {
//                 return response || fetch(event.request);
//             })
//             .then(async (response) => {
//                 const cache = await caches.open(staticCacheName);
//                 cache.put(event.request.url, response.clone());

//                 return response;
//             })
//             .catch(async (error) => {
//                 const cache = await caches.open(staticCacheName);
//                 const cachedResponse = await cache.match('404.html');

//                 return cachedResponse;
//             })
//     );
// });
