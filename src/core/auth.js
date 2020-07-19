import React from 'react'
import { fetchJSON } from './helpers'

const defaultResolve = Function.prototype
const defaultReject = e => {
  // console.error(e)
}

const base = process.env.NEXT_PUBLIC_API_URL + '/api'

export const sendConfirmCode = ({ email }) =>
  fetchJSON(`${base}/users`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  })

class Auth {
  constructor() {
    this.base = process.env.NEXT_PUBLIC_API_URL + '/api'

    this.sendConfirmCode = this.sendConfirmCode.bind(this)
    this.confirm = this.confirm.bind(this)
    this.logout = this.logout.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  async sendConfirmCode(
    { email },
    resolve = defaultResolve,
    reject = defaultReject,
  ) {
    try {
      await fetchJSON(`${this.base}/users`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      resolve()
    } catch (e) {
      reject(e)
    }
  }

  async confirm(
    { email, code },
    resolve = defaultResolve,
    reject = defaultReject,
  ) {
    try {
      const { current_user } = await fetchJSON(`${this.base}/tokens`, {
        method: 'POST',
        body: JSON.stringify({ email, otp: code }),
      })
      resolve(current_user)
    } catch (e) {
      reject(e)
    }
  }

  async logout(resolve = defaultResolve, reject = defaultReject) {
    try {
      await fetchJSON(`${this.base}/tokens`, {
        method: 'DELETE',
      })
      resolve()
    } catch (e) {
      reject(e)
    }
  }

  async getProfile(resolve = defaultResolve, reject = defaultReject) {
    try {
      const { current_user } = await fetchJSON(`${this.base}/profile`)
      resolve(current_user)
    } catch (e) {
      reject(e)
    }
  }
}

export const auth = new Auth()

export const UserContext = React.createContext()

export const useUser = initial => {
  const [user, setUser] = React.useState(initial)

  const updateUser = React.useCallback(user => {
    setUser(user)
  }, [])

  return {
    user,
    updateUser,
  }
}
