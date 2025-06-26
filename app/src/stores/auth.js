
import { defineStore } from 'pinia'
import axios from 'axios'

// const tokenURL = 'http://api.physcon.my/token'
const tokenURL = import.meta.env.VITE_API_BASE+'/token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(username, password) {
        // console.log("login: ", username, password)
        const response = await axios.post(tokenURL, {
            username,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
      this.token = response.data.access_token
      localStorage.setItem('token', this.token)
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})

