var CACHE_NAME = 'fintrack-cache-v1';
var STATIC_ASSETS = [
  '/',
  '/home',
  '/index.html',
  '/app.html',
  '/i18n.js',
  '/favicon.svg',
  '/manifest.json',
  '/modules/dashboard.js',
  '/modules/accounts.js',
  '/modules/income.js',
  '/modules/outcome.js',
  '/modules/projected-income.js',
  '/modules/projected-outcome.js',
  '/modules/report.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) {
          return caches.delete(k);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  // Always bypass API calls and non-GET requests
  if (req.method !== 'GET' || req.url.indexOf('/api/') !== -1) {
    return;
  }

  // Network-first strategy with cache fallback
  e.respondWith(
    fetch(req).then(function(res) {
      if (res && res.status === 200 && res.type === 'basic') {
        var resClone = res.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(req, resClone);
        });
      }
      return res;
    }).catch(function() {
      return caches.match(req).then(function(cached) {
        if (cached) return cached;
        // Offline fallback for navigation requests
        if (req.mode === 'navigate') {
          return caches.match('/app.html') || caches.match('/index.html');
        }
      });
    })
  );
});
