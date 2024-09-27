<template>
  <div>
    <h2>投票</h2>
    <el-form @submit.prevent="createVote">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="newVote.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="newVote.description"></el-input>
      </el-form-item>
      <el-form-item label="选项" :label-width="formLabelWidth">
        <el-button type="primary" @click="addOption">添加选项</el-button>
        <el-input
          v-for="(option, index) in newVote.options"
          :key="index"
          v-model="newVote.options[index]"
          placeholder="选项内容"
          style="margin-top: 10px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" native-type="submit">创建投票</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-table :data="votes" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="viewVote(scope.row)">查看</el-button>    
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const votes = ref([])
const newVote = reactive({
  title: '',
  description: '',
  options: ['',''], // 至少两个选项
})
const formLabelWidth = '80px'

const addOption = () => {
  newVote.options.push('')
}

const createVote = async () => {
  // 验证
  if (!newVote.title || newVote.options.length < 2 || newVote.options.some(opt => !opt)) {        
    ElMessage.error('请填写投票标题和至少两个选项')
    return
  }

  const token = localStorage.getItem('token')
  try {
    const response = await axios.post('/api/vote/create', newVote, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.status === 'success') {
      ElMessage.success('投票创建成功')
      // 清空表单
      newVote.title = ''
      newVote.description = ''
      newVote.options = ['','']
      fetchVotes()
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('创建投票失败')
  }
}

const fetchVotes = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('/api/vote/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.status === 'success') {
      votes.value = response.data.data
    } else {
      ElMessage.error(response.data.message)
    }
  } catch (error) {
    ElMessage.error('获取投票列表失败')
  }
}

const viewVote = (vote: any) => {
  // 实现查看投票详情的逻辑，如弹出对话框显示投票详情
  ElMessage.info(`查看投票：${vote.title}`)
}

onMounted(() => {
  fetchVotes()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>