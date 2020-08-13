import { setPushInfo } from 'core/api'

export const vapid = new Uint8Array([
  4,
  161,
  131,
  141,
  25,
  157,
  240,
  184,
  84,
  90,
  119,
  17,
  98,
  64,
  84,
  148,
  208,
  46,
  161,
  74,
  144,
  211,
  84,
  185,
  234,
  208,
  22,
  101,
  230,
  23,
  169,
  68,
  173,
  87,
  31,
  132,
  21,
  22,
  131,
  208,
  3,
  25,
  196,
  36,
  230,
  238,
  116,
  87,
  213,
  194,
  111,
  191,
  37,
  151,
  48,
  67,
  28,
  185,
  1,
  100,
  182,
  253,
  223,
  21,
  156,
])

export function isPushNotificationsSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  )
}

export async function askUserPermission() {
  const permission = await Notification.requestPermission()

  return permission
}

export async function createNotificationsSubscription() {
  const sw = await navigator.serviceWorker.ready
  const permission = await Notification.requestPermission()

  if (permission === 'denied') return

  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapid,
  })

  const pushData = {
    endpoint: subscription.endpoint,
    p256dh: btoa(
      String.fromCharCode.apply(
        null,
        new Uint8Array(subscription.getKey('p256dh')),
      ),
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_'),
    auth: btoa(
      String.fromCharCode.apply(
        null,
        new Uint8Array(subscription.getKey('auth')),
      ),
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_'),
  }

  console.log(pushData)

  try {
    await setPushInfo(pushData)
  } catch (e) {
    console.error(e)
  }
}
