function receivePushNotification(event) {
  console.log('get push', event, event.data.json())

  const releases = event.data.json()
  let options

  if (releases.length === 1) {
    const [release] = releases

    options = {
      title: release.title,
      data: `https://released.at/release/${release.id}`,
      body: release.description,
      icon: 'https://released.at/images/logo.png',
      vibrate: [200, 100, 200],
      tag: 'Released',
      image: release.cover,
      badge: 'https://released.at/images/logo.png',
    }
  } else {
    options = {
      title: `Сегодня вышли: ${releases.map(re => re.title).join(', ')}`,
      data: `https://released.at/me`,
      icon: 'https://released.at/images/logo.png',
      vibrate: [200, 100, 200],
      tag: 'Released',
      image: releases[0].cover,
      badge: 'https://released.at/images/logo.png',
      actions:
        releases.length > 4
          ? [
              ...releases.slice(0, 3)map(re => ({
                action: `https://released.at/release/${re.id}`,
                title: re.title,
              })),
              { action: `https://released.at/me`, title: 'Смотреть все' },
            ]
          : releases.map(re => ({
              action: `https://released.at/release/${re.id}`,
              title: re.title,
            })),
    }
  }

  const { title, ...rest } = options
  event.waitUntil(self.registration.showNotification(title, rest))
}

function openPushNotification(event) {
  console.log('open push', event.notification.data)

  event.notification.close()

  if (typeof event.action === 'string') {
    clients.openWindow(event.action)
  }
}

self.addEventListener('push', receivePushNotification)
self.addEventListener('notificationclick', openPushNotification, false)
