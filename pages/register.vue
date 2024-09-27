<template>
  <el-container style="height: 100vh; justify-content: center; align-items: center;">
    <el-card class="register-card" :style="{ width: '400px' }">
      <h2 style="text-align: center;">注册</h2>
      <el-form :model="form" @submit.prevent="handleRegister">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>        
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="form.class"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentId" v-if="form.role === 'student'">
          <el-input v-model="form.studentId"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="学生" value="student"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="width: 100%;">注册</el-button>    
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-link href="/login">已有账号？登录</el-link>
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
  role: 'student',
  class: '',
  studentId: '',
})

const handleRegister = async () => {
  try {
    const response = await axios.post('/api/auth/register', form)
    if (response.data.status === 'success') {
      localStorage.setItem('token', response.data.data.token)
      ElMessage.success('注册成功')
      router.push('/')
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('注册失败')
  }
}
</script>

<style scoped>
.register-card {
  padding: 20px;
}
</style>