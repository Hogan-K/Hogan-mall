export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore()
    console.log('middleware')
})
