<template>
  <el-table :data="students" style="width: 100%">
    <el-table-column prop="username" label="用户名"></el-table-column>
    <el-table-column prop="class" label="班级"></el-table-column>
    <el-table-column prop="studentId" label="学号"></el-table-column>
    <el-table-column prop="points" label="积分"></el-table-column>
    <!-- 其它列 -->
  </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const students = ref([])

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
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('获取学生列表失败')
  }
}

onMounted(() => {
  fetchStudents()
})
</script>