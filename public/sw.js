self.addEventListener('install', function(event) {
    console.log("installing")

    //create cache and database

    event.waitUntil(
        caches.open('static').then(function(cache) {
            return cache.addAll([
                '/global.js',
                '/',
                '/index.html',
                '/map.html',
                '/map2.html',
                'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.3.4/dist/leaflet.js',
                '/css/map.css',
                '/css/style.css',
                '/images/email.png',
                '/images/facebook.png',
                '/images/github.png',
                '/images/js.png',
                '/images/kopibali.jpeg',
                '/images/kopiluwak.jpeg',
                '/images/kopipot.jpeg',
                '/images/linkedin.png',
                '/images/photo.png',
                '/images/seniman.jpeg',
                '/images/titiktemu.jpeg',
                '/js/map.js',
                '/lesson1/add2numbers.html',
                '/lesson1/add2numbers.js',
                '/lesson1/add2numbers.css'
            ])
        }).then(function(){
            console.log("install finished")
        }).catch(function(err) {
            console.log(err + "error")
        })
    )
})

self.addEventListener("activate", function (event) {
    // check if cache is outdates and update
    event.waitUntil(
        caches
            .keys()
            .then(function (keys) {
                // We return a promise that settles when all outdated caches are deleted.
                return Promise.all(
                    keys
                        .filter(function (key) {
                            return !key.startsWith('static');
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                );
            })
            .then(function () {
                console.log('activate completed.');
            })
    );
});

self.addEventListener('fetch', function(event) {
    // generate information about fetching data in this website, including request method and headers
    console.log('Fetching: ', event.request.url)
    console.log(event.request)
    console.log(event.request.method)
    console.log(event.request.headers)

    // if request in fetch match with cache, use resource from cache
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
})