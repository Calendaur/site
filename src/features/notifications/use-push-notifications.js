import { useEffect } from 'react'
import { useUser } from '../user/use-user'
import {
  isPushNotificationsSupported,
  createNotificationsSubscription,
} from './utils'

export function usePushNotifications() {
  const { user, token } = useUser()

  useEffect(() => {
    if (!user || !isPushNotificationsSupported()) return

    createNotificationsSubscription(token)
  }, [token, user])
}
