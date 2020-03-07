import { config } from '../src/components/firebase-provider'

importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js')

firebase.initializeApp(config)

firebase.messaging()

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  const title = 'Hello World'
  const options = {
    body: payload.data.status,
  }

  return self.registration.showNotification(title, options)
})
