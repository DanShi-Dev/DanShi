// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', 'nuxt-mongoose'],
  nitro: {
    hooks: {
      'nitro:server:before': async () => {
        const connectDB = await import('./server/utils/db').then(m => m.default)
        await connectDB()
      }
    }
  },
})