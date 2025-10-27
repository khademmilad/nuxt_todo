// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000'
    },
    private: {
      apiSecret: process.env.API_SECRET || 'secret'
    }
  },

  modules: ['@pinia/nuxt']
})