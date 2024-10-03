// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
//   compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    "@nuxt/content",
    'nuxt-mongoose',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  mongoose: {
    // 配置选项
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/student_service_platform',
    // 其他 Mongoose 配置选项
    modelsDir: 'server/models'
  },
  ssr: true,
})