const V='wio-v11';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  // The page itself: network first, so an update shows on the next open. Offline, or after 3s on a slow network, use the saved copy.
  if(e.request.mode==='navigate'){
    const net=fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put('./index.html',c))}return r});
    const slow=new Promise(res=>setTimeout(res,3000));
    e.respondWith(Promise.race([net,slow]).then(r=>r||caches.match('./index.html').then(h=>h||net)).catch(()=>caches.match('./index.html')));
    return;
  }
  // Everything else (icons, fonts): saved copy first.
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    if(r&&r.status===200&&(e.request.url.startsWith(self.location.origin)||/fonts\.(googleapis|gstatic)\.com/.test(e.request.url))){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}
    return r}).catch(()=>caches.match('./index.html'))));
});
