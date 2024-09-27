<template>
  <el-form :model="form" @submit.prevent="handleLogin">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
      <el-button @click="$router.push('/register')">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/auth/login', form)
    if (response.data.status === 'success') {
      localStorage.setItem('token', response.data.data.token)
      // 重定向到首页或其它页面
      router.push('/')
    } else {
      elMessage.error(response.data.message)
    }
  } catch (error) {
    elMessage.error('登录失败')
  }
}
</script>