import { onAuthStateChanged, getAuth } from "firebase/auth"

export default defineNuxtRouteMiddleware((to) => {
    const router = useRouter()
    const auth = getAuth()

    if (import.meta.client) {
        sessionStorage.setItem('from_path', to.fullPath)
        const sessionAuth = sessionStorage.getItem('auth')
        onAuthStateChanged(auth, (res) => {
            if (!res || !sessionAuth) {
                router.push({ path: '/login' })
            }
        })
    }
})
