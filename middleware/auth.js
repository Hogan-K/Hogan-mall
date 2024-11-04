export default defineNuxtRouteMiddleware((to, from) => {
    const router = useRouter()
    const store = useStore()

    useState('toPath', () => to)
    if (!store.auth.user || !store.userInfo.email) {
        return router.push({ path: '/login' })
    }
})
