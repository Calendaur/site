function receivePushNotification(event) {
  try {
    console.log('receive push', event, event.data.json())

    const releases = event.data.json()

    let options

    if (releases.length === 1) {
      const [release] = releases

      options = {
        title: release.title,
        data: `https://released.at/release/${release.release_id}`,
        body: release.description,
        icon: 'https://released.at/images/logo.png',
        vibrate: [200, 100, 200],
        tag: 'Released',
        image: release.cover,
        badge: 'https://released.at/images/logo.png',
      }
    } else if (releases.length === 2) {
      options = {
        title: `Сегодня вышли: ${releases.map(re => re.title).join(', ')}`,
        data: `https://released.at/me`,
        icon: 'https://released.at/images/logo.png',
        vibrate: [200, 100, 200],
        tag: 'Released',
        image: releases[0].cover,
        badge: 'https://released.at/images/logo.png',
        actions: releases.map(re => ({
          action: `https://released.at/release/${re.release_id}`,
          title: re.title,
        })),
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
        actions: [
          { action: `https://released.at/me`, title: 'В личный кабинет' },
        ],
      }
    }

    console.log(options)

    const { title, ...rest } = options
    event.waitUntil(self.registration.showNotification(title, rest))
  } catch (e) {
    console.error('receive error', e)
  }
}

function openPushNotification(event) {
  try {
    console.log('open push', event.notification.data)

    event.notification.close()

    clients.openWindow(event.notification.data)
  } catch (e) {
    console.error('open error', e)
  }
}

self.addEventListener('push', receivePushNotification)
self.addEventListener('notificationclick', openPushNotification)
