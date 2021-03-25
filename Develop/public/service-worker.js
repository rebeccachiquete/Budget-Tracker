const APP_PREFIX = "my-cache",
const VERSION = "v1",
const CACHE_NAME = APP_PREFIX+VERSION,
const DATA_CACHE_NAME = "data-cache-" + VERSION


const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/js/idb.js',
    '/js/index.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
  ];
  
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then(function(cache){
                console.log("installing" + CACHE_NAME)
                return cache.addAll(FILES_TO_CACHE)
        })
    );
  });
  
  // The activate handler takes care of cleaning up old caches.
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches
        .keys()
        .then(function(keylist){
            var cachekeep = keylist.filter(function(key){
                return key.indexOf(APP_PREFIX)
            })
            cachekeep.push(CACHE_NAME)
            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeeplist.indexOf(key) === -1) {
                  console.log('deleting cache : ' + keyList[i] );
                  return caches.delete(keyList[i]);
                }
              }));
        })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    if (event.request.url.includes("/api")){
        event.respondwith(
            caches.open(DATA_CACHE_NAME).then(function(){
                return fetch(event.request).then(function(response){
                    if (response.status === 200){
                        cache.put(event.request.url, response.clone())
                    }
                    return response
                })
            })
        )
    }
    event.respondwith(
        fetch(event.request).catch(function(){
            return caches.match(event.request).then(function(response) {
                if (response) {
                  return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                  return caches.match("/");
                }
            })
        })
    )
  });
  