export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    if (! userStore.isLogin() && to.path != '/user/login') {
        return navigateTo('/user/login')
    }
})
