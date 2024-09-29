<template>
  <div>
    <h2>学生列表</h2>
    <UButton label="刷新列表" @click="fetchStudents" />
    <UTable :columns="columns" :rows="students" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const columns = [
  { key: 'username', label: '用户名' },
  { key: 'class', label: '班级' },
  { key: 'studentId', label: '学号' },
  { key: 'points', label: '积分' },
  // 其他列
]

const students = ref([])
const toast = useToast()

const fetchStudents = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('/api/user/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.status === 'success') {
      students.value = response.data.data
    } else {
      toast.add({ title: response.data.message, type: 'error' })
    }
  } catch (error) {
    toast.add({ title: '获取学生列表失败', type: 'error' })
  }
}

onMounted(() => {
  fetchStudents()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
UButton {
  margin-bottom: 20px;
}
</style>