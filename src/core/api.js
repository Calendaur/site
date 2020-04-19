import fetch from 'isomorphic-unfetch'

class Api {
  constructor() {
    this.base = process.env.API_URL + '/api'
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
}

const api = new Api()

export { api }
