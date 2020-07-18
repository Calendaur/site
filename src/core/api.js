import fetch from 'isomorphic-unfetch'

class Api {
  constructor() {
    this.base = process.env.NEXT_PUBLIC_API_URL + '/api'
  }

  async getMe() {
    try {
      const response = await fetch(`${this.base}/profile`, {
        credentials: 'include',
      })
      const json = await response.json()

      if (response.ok) {
        return json
      } else {
        return {
          error: json,
        }
      }
    } catch (e) {
      console.error(e)
      return {
        error: e,
      }
    }
  }

  async confirmAuthCode(email, code) {
    try {
      const response = await fetch(`${this.base}/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: code }),
      })

      if (response.status === 204 || response.statusText === 'No Content') {
        return {
          success: true,
        }
      } else {
        return {
          success: false,
          error: true,
        }
      }
    } catch (e) {
      console.error(e)
      return {
        error: e,
      }
    }
  }

  async sendAuthCode(email) {
    try {
      const response = await fetch(`${this.base}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.status === 204 || response.statusText === 'No Content') {
        return {
          success: true,
        }
      } else {
        return {
          success: false,
          error: true,
        }
      }
    } catch (e) {
      console.error(e)
      return {
        error: e,
      }
    }
  }

  async getReleases(type, date) {
    try {
      const response = await fetch(`${this.base}/${type}?date=${date}`)
      const json = await response.json()

      if (response.ok) {
        return json
      } else {
        return {
          error: json,
        }
      }
    } catch (e) {
      console.error(e)
      return {
        error: e,
      }
    }
  }

  async getRelease(id) {
    try {
      const response = await fetch(`${this.base}/releases/${id}`)
      const json = await response.json()

      if (response.ok) {
        return json
      } else {
        return {
          error: json,
        }
      }
    } catch (e) {
      console.error(e)
      return {
        error: e,
      }
    }
  }
}

const api = new Api()

export { api }
