// StormWatch service worker
// Goal: launch the installed app instantly from cache and keep it working
// offline. The app shell (HTML/manifest/icons) and web fonts are served with a
// stale-while-revalidate strategy — the cached copy renders immediately while a
// fresh copy is fetched in the background for next time. Weather/news API calls
// are left to the network because the app already caches them in localStorage
// with its own freshness rules.

const CACHE = 'stormwatch-shell-v1';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // Cache shell items individually so one missing asset can't fail the whole install
      .then((cache) => Promise.allSettled(SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont =
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com';

  // Only intercept the app shell and fonts. Let API requests hit the network.
  if (!sameOrigin && !isFont) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);

    const fetchAndUpdate = fetch(req)
      .then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          cache.put(req, res.clone());
        }
        return res;
      })
      .catch(() => null);

    if (cached) {
      // Serve cached immediately, refresh in the background for next launch.
      event.waitUntil(fetchAndUpdate);
      return cached;
    }

    const res = await fetchAndUpdate;
    if (res) return res;

    // Offline and nothing cached: fall back to the app shell for navigations.
    if (req.mode === 'navigate') {
      const fallback = (await cache.match('./index.html')) || (await cache.match('./'));
      if (fallback) return fallback;
    }
    return Response.error();
  })());
});
