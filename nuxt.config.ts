// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    'nuxt-mongoose',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
  ],
  mongoose: {
    // 配置选项
    uri: process.env.MONGODB_URI,
    // 其他 Mongoose 配置选项
    options: {
      dbName: process.env.MONGO_DB,
    },
    modelsDir: 'server/models',
  },
  ssr: true,
  pinia: {
    storesDirs: ['./store/**'],
  },
  piniaPersistedstate: {
    storage: 'cookies',
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
