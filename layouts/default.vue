<template>
  <div class="flex flex-col h-screen">
    <!-- 顶部导航栏 -->
    <header class="shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16"> 
        <!-- 左侧：Logo / 标题 -->
        <div>
          复旦学生管理系统
        </div>

        <!-- 中间：导航菜单（桌面端） -->
        <nav v-if="!isMobile" class="flex space-x-4">
          <UHorizontalNavigation :links="horizontalLinks" class="border-b border-gray-200 dark:border-gray-800" />
        </nav>

        <!-- 中间：导航菜单（移动端） -->
        <div v-else class="relative">
          <UDropdown :items="[mobileDropdownItems]" :popper="{ placement: 'bottom-start' }">        
            <UButton
              variant="outline"
              color="white"
              mode="hover"
              label="菜单"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>

        <!-- 右侧：用户信息 -->
        <div class="relative">
          <UDropdown :items="[userDropdownItems]" :popper="{ placement: 'bottom-end' }">
            <UButton
              variant="outline"
              color="blue"
              class="inline-flex items-center justify-center p-2 rounded-md text-blue-500 hover:text-blue-700 hover:bg-blue-50 focus:outline-none"
              :label="userName"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const router = useRouter()
const toast = useToast()

const userName = ref('')
const isMobile = ref(false)

const menuItems = [
  { index: 'shared', label: '文件共享', route: '/shared' },
  { index: 'vote', label: '投票', route: '/vote' }
]

// 定义 horizontalLinks 以符合 UHorizontalNavigation 的要求
const horizontalLinks = menuItems.map(item => ({
  label: item.label,
  to: item.route,
  // 可选：如果需要在点击时执行额外操作，可以添加 click 事件
  click: () => handleSelect(item.index)
}))

// 定义移动端导航下拉菜单的项
const mobileDropdownItems = menuItems.map(item => ({
  label: item.label,
  to: item.route,
  click: () => handleSelect(item.index)
}))

// 定义用户信息下拉菜单的项
const userDropdownItems = [
  {
    label: '个人主页',
    click: () => handleCommand('profile')
  },
  {
    label: '登出',
    click: () => handleCommand('logout')
  }
]

// 处理导航菜单选择
const handleSelect = (command: string) => {
  router.push(menuItems.find(item => item.index === command)?.route || '/')
}

// 处理用户下拉菜单命令
const handleCommand = (command: string) => {
  if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'logout') {
    // 清除 token 并重定向到登录
    localStorage.removeItem('token')
    toast.add({ title: '已登出' })
    router.push('/login')
  }
}

// 获取用户信息
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
      toast.add({ title: response.data.message })
      router.push('/login')
    }
  } catch (error) {
    toast.add({ title: '获取用户信息失败' })
    router.push('/login')
  }
}

// 更新是否为移动端
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