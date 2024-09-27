<template>
  <el-container style="height: 100vh; display: flex; flex-direction: column;">
    <!-- 顶部导航栏 -->
    <el-header class="header">
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
import axios from 'axios'

const router = useRouter()
const activeMenu = ref('shared') // 默认选中菜单
const userName = ref('朱程炀')

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
  console.log('entede')
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
  console.log('mouted')
  fetchUserInfo()
  updateIsMobile()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* 顶部导航栏样式 */
.header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

/* Logo 样式 */
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #0277bd; /* 深蓝色字体 */
}

/* 导航菜单样式 */
.nav-menu {
  background: transparent;
  border: none;
  color: #0277bd; /* 深蓝色字体 */
}

.nav-menu .el-menu-item {
  color: #0277bd;
}

.nav-menu .el-menu-item.is-active {
  background-color: #b3e5fc; /* 选中时浅蓝色背景 */
  color: #2b74ac;
}

.nav-menu .el-menu-item:hover {
  background-color: #b3e5fc; /* 悬停时浅蓝色背景 */
  color: #01579b;
}

/* 移动端菜单样式 */
.nav-menu-mobile {
  display: flex;
  justify-content: center;
}

.nav-dropdown-link {
  color: #0277bd;
}

/* 用户信息样式 */
.user-info {
  text-align: right;
  color: #0277bd;
}

.user-info .el-dropdown-link {
  color: #0277bd;
}

/* 主体内容样式 */
.main-content {
  background-color: #f1f8e9; /* 非常浅的蓝绿色背景，保持整体轻盈感 */
  padding: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}

/* 去除菜单的选中高亮默认样式 */
.el-menu-horizontal > .el-menu-item.is-active {
  background-color: transparent;
}

/* 修改下拉菜单的颜色 */
.el-dropdown-menu {
  background-color: #e0f7fa;
}

.el-dropdown-menu .el-dropdown-item {
  color: #0277bd;
}

.el-dropdown-menu .el-dropdown-item:hover {
  background-color: #b3e5fc;
  color: #01579b;
}

/* 响应式调整主体内容 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
}
</style>