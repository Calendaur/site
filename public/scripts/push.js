function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.')
  console.log(event)

  const { title, cover, description } = event.data.json()

  const options = {
    data: 'https://released.at/release/18162',
    body: description,
    icon: cover,
    vibrate: [200, 100, 200],
    tag: `${title} вышел!`,
    image: cover,
    badge: 'https://released.at/images/logo.png',
  }
  event.waitUntil(self.registration.showNotification(title, options))
}

function openPushNotification(event) {
  console.log(
    '[Service Worker] Notification click Received.',
    event.notification.data,
  )

  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data))
}

self.addEventListener('push', receivePushNotification)
self.addEventListener('notificationclick', openPushNotification)
