
export const useUserStore = defineStore('user', () => {
  const nickname = ref('')
  const studentId = ref('')
  const role = ref('')

  const token = ref('')


  // judge if the user is logged in
  function isLogin() {
    return !!token.value
  }

  return {
    nickname,
    studentId,
    role,
    token,
    isLogin
  }
})