// Service worker: يعرض إشعار "طلبك جاهز" ويعيد فتح صفحة الطلب عند الضغط عليه
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    for (const c of cs) if (c.url === url && "focus" in c) return c.focus();
    return self.clients.openWindow(url);
  }));
});
