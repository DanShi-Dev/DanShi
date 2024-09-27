<template>
  <div>
    <h2>个人主页</h2>
    <el-card>
      <el-descriptions title="个人信息" border>
        <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ user.role }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{ user.class }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ user.studentId }}</el-descriptions-item>
        <el-descriptions-item label="积分">{{ user.points }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const user = ref({
  username: '',
  role: '',
  class: '',
  studentId: '',
  points: 0,
})

const fetchUserInfo = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.status === 'success') {
      user.value = response.data.data
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>