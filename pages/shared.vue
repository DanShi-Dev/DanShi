<template>
  <div>
    <h2>文件共享</h2>
    <el-upload
      class="upload-demo"
      action="/api/resource/upload"
      :headers="uploadHeaders"
      :data="uploadData"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
    >
      <el-button type="primary">上传文件</el-button>
    </el-upload>

    <el-table :data="resources" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="文件">
        <template #default="scope">
          <a :href="scope.row.fileUrl" target="_blank">查看文件</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const resources = ref([])

const uploadHeaders = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}

const uploadData = {
  class: '', // 根据实际情况填写
}

const handleUploadSuccess = (response: any) => {
  if (response.status === 'success') {
    ElMessage.success('文件上传成功')
    fetchResources()
  } else {
    ElMessage.error(response.message)
  }
}

const fetchResources = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('/api/resource/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        class: '', // 根据实际情况填写
      },
    })
    if (response.data.status === 'success') {
      resources.value = response.data.data
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('获取资源列表失败')
  }
}

onMounted(() => {
  fetchResources()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
.upload-demo {
  margin-bottom: 20px;
}
</style>