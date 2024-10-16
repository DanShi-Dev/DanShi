// https://nuxt.com/docs/api/configuration/nuxt-config
const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('MONGODB_URI is not defined')
}
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
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB,
    },
    modelsDir: 'server/models',
  },
  runtimeConfig: {
    public: {
      MONGODB_URI: process.env.MONGODB_URI,
      MONGO_DB: process.env.MONGO_DB,
      MONGO_USER: process.env.MONGO_USER,
      MONGO_PASSWORD: process.env.MONGO_PASSWORD,
      JWT_SECRET: process.env.JWT_SECRET,
    },
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
