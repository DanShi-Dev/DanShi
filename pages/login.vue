<template>
  <el-container style="height: 100vh; justify-content: center; align-items: center;">
    <el-card class="login-card" :style="{ width: '400px' }">
      <h2 style="text-align: center;">登录</h2>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>        
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="width: 100%;">登录</el-button>    
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-link href="/register">没有账号？注册</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script setup lang="ts">
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
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('登录失败')
  }
}
</script>

<style scoped>
.login-card {
  padding: 20px;
}
</style>