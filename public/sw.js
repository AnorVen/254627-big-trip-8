/*
const CACHE_NAME = `Points`;
self.addEventListener('install', (event) => {
  console.log(`sw, install`, {event});
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./bundle.js`,
        `./bundle.js.map`,
        `./css/normalize.css`,
        `./css/main.css`,
        `./img/star--check.svg`,
        `./img/star.svg`,
      ]);
    })
  )
});

self.addEventListener(`activate`, (evt) => {
  console.log(`sw`, `activate`, {evt});
});

self.addEventListener('fetch', (event) => {

  event.respondWith(
    // TODO разобраться с этим...
    caches.match(event.request)
      .then((response) => {
        console.log(response)
        if (response !== undefined) {
          console.log(`Find in cache`, {response});
          return response;
        } else {
          return fetch(event.request)
            .then( (response)=> {
            let responseClone = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
            .catch((err) => {
              console.error({err});
              throw err;
            });
        }
      }));
});
*/
