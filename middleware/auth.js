import { onAuthStateChanged, getAuth } from "firebase/auth"

export default defineNuxtRouteMiddleware((to) => {
    const router = useRouter()
    const auth = getAuth()

    if (import.meta.client) {
        useState('toPath', () => to)
        const sessionAuth = sessionStorage.getItem('auth')
        onAuthStateChanged(auth, (res) => {
            if (!res || !sessionAuth) {
                router.push({ path: '/login' })
            }
        })
    }
})
