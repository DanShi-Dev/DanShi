<template>
  <div class="flex items-center justify-center min-h-screen">
    <UCard class="max-w-sm w-full mx-auto my-2 sm:my-4 md:my-8 p-6 rounded-lg shadow-md">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        title="欢迎回来！"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
        :loading="loading"
        :submit-button="{ label: '登录', icon: 'i-material-symbols-login-rounded' }"
      >
        <template #description>
          还没有账号？ <NuxtLink to="/register" class="text-primary font-medium">注册</NuxtLink>。
        </template>

        <template #password-hint>
          <NuxtLink to="/forgot-password" class="text-primary font-medium">忘记密码？</NuxtLink>
        </template>

        <template #validation>
          <UAlert
            v-if="errorMessage"
            color="red"
            icon="i-heroicons-information-circle-20-solid"
            :title="errorMessage"
          />
        </template>

        <template #footer>
          登录即表示您同意我们的 <NuxtLink to="/terms" class="text-primary font-medium">服务条款</NuxtLink>。
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义表单字段
const fields = [
  {
    name: 'studentId',
    type: 'text',
    label: '学号',
    placeholder: '请输入您的学号',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: '密码',
    placeholder: '请输入您的密码',
    required: true
  }
]

// 定义验证函数
const validate = (state: any) => {
  const errors = []
  if (!state.studentId) {
    errors.push({ path: 'studentId', message: '学号为必填项' })
  }
  if (!state.password) {
    errors.push({ path: 'password', message: '密码为必填项' })
  }
  return errors
}

// 定义错误信息
const errorMessage = ref('')

// 定义加载状态
const loading = ref(false)

// 使用路由进行跳转
const router = useRouter()

// 提交处理函数
async function onSubmit(data: any) {
  loading.value = true
  errorMessage.value = ''

  try {
    // 模拟API请求，请将此处替换为实际的登录API请求
    const response = await fakeLoginApi(data.studentId, data.password)

    if (response.success) {
      // 登录成功，跳转到主页
      router.push('/')
    } else {
      // 登录失败，显示错误信息
      errorMessage.value = response.message || '登录失败，请重试。'
    }
  } catch (error) {
    // 处理异常情况
    errorMessage.value = '发生错误，请稍后再试。'
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 模拟的登录API函数，请替换为实际的API调用
function fakeLoginApi(studentId: string, password: string): Promise<{ success: boolean, message?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (studentId === '20230001' && password === 'password123') {
        resolve({ success: true })
      } else {
        resolve({ success: false, message: '学号或密码错误。' })
      }
    }, 1000)
  })
}
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>