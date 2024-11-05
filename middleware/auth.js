import { onAuthStateChanged, getAuth } from "firebase/auth"

export default defineNuxtRouteMiddleware((to) => {
    const router = useRouter()
    const auth = getAuth()

    if (import.meta.client) {
        useState('toPath', () => to)

        onAuthStateChanged(auth, (res) => {
            if (!res) {
                router.push({ path: '/login' })
            }
        })
    }
})
