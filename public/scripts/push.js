function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.')
  console.log(event)

  self.addEventListener('push', event => {
    let title = (event.data && event.data.text()) || 'Yay a message'
    let body = 'We have received a push message'
    let tag = 'push-simple-demo-notification-tag'
    let icon = '/assets/my-logo-120x120.png'

    event.waitUntil(
      self.registration.showNotification(title, { body, icon, tag }),
    )
  })
  event.waitUntil(self.registration.showNotification(title, {}))
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
