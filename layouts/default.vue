<!-- layouts/default.vue -->
<template>
  <el-container style="height: 100vh; display: flex; flex-direction: column;">
    <!-- 顶部导航栏 -->
    <el-header>
      <el-row justify="space-between" align="middle">
        <!-- 左侧：Logo / 标题 -->
        <el-col :span="6">
          <div class="logo">复旦学生管理系统</div>
        </el-col>

        <!-- 中间：导航菜单，隐藏在移动端 -->
        <el-col :span="12" class="nav-menu-container" v-if="!isMobile">
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            class="nav-menu"
            @select="handleSelect"
          >
            <el-menu-item index="shared">
              文件共享
            </el-menu-item>
            <el-menu-item index="vote">
              投票
            </el-menu-item>
          </el-menu>
        </el-col>

        <!-- 中间：移动端下拉菜单 -->
        <el-col :span="12" class="nav-menu-mobile" v-if="isMobile">
          <el-dropdown @command="handleSelect">
            <span class="el-dropdown-link">
              菜单 <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="shared">文件共享</el-dropdown-item>
              <el-dropdown-item command="vote">投票</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <!-- 右侧：用户信息 -->
        <el-col :span="6" class="user-info">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userName }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人主页</el-dropdown-item>
              <el-dropdown-item command="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>

    <!-- 主体内容 -->
    <el-main>
      <NuxtPage />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
// import { ElMessage } from 'element-plus'
import axios from 'axios'

const router = useRouter()
const activeMenu = ref('shared') // 默认选中菜单
const userName = ref('')

const handleSelect = (command: string) => {
  activeMenu.value = command
  if (command === 'shared') {
    router.push('/shared')
  } else if (command === 'vote') {
    router.push('/vote')
  }
}

const handleCommand = (command: string) => {
  if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'logout') {
    // 清除 token 并重定向到登录
    localStorage.removeItem('token')
    ElMessage.success('已登出')
    router.push('/login')
  }
}

const fetchUserInfo = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await axios.get('/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.status === 'success') {
      userName.value = response.data.data.username
    } else {
      ElMessage.error(response.data.message)
      router.push('/login')
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败')
    router.push('/login')
  }
}

const isMobile = ref(false)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const onResize = () => {
  updateIsMobile()
}

onMounted(() => {
  fetchUserInfo()
  updateIsMobile()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.nav-menu {
  background: transparent;
  border: none;
}
.nav-menu-container {
  display: flex;
  justify-content: center;
}
.nav-menu-mobile {
  display: flex;
  justify-content: center;
}
.user-info {
  text-align: right;
  color: #fff;
}
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>