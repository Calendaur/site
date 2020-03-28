importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyBocY4_tAx1Y85w5agrgYK7ptcYxgRWcb8',
  projectId: 'release-calendar-487f9',
  messagingSenderId: '564145539525',
  appId: '1:564145539525:web:a633ca316fe96db04f23ac',
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  const title = 'Hello World'
  const options = {
    body: payload.data.status,
  }

  return self.registration.showNotification(title, options)
})
