import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import axios from 'axios'
// import { ElMessage } from 'element-plus'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = localStorage.getItem('token')
  if (!token) {
    if (to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login')
    }
  } else {
    try {
      const response = await axios.get('/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.data.status !== 'success') {
        ElMessage.error('验证失败，请重新登录')
        localStorage.removeItem('token')
        return navigateTo('/login')
      }
    } catch (error) {
      ElMessage.error('验证失败，请重新登录')
      localStorage.removeItem('token')
      return navigateTo('/login')
    }
  }
})