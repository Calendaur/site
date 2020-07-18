import React from 'react'
import { fetchJSON } from './helpers'

const defaultResolve = Function.prototype
const defaultReject = e => console.error(e)

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
      const { current_user } = await fetch(`${this.base}/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: code }),
      })
      this.me = current_user
      resolve(current_user)
    } catch (e) {
      reject(e)
    }
  }

  async logout() {
    this.me = null
  }

  async getProfile(
    { token },
    resolve = defaultResolve,
    reject = defaultReject,
  ) {
    try {
      const user = await fetch(`${this.base}/profile`, {
        credentials: 'include',
        headers: {
          Authorization: token,
        },
      })
      this.me = user
      resolve(user)
    } catch (e) {
      reject(e)
    }
  }
}

export const UserContext = React.createContext(null)
export const auth = new Auth()
