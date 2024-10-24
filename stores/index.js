export const useStore = defineStore('store', {
    state: () => ({
        screenWidth: 0
    }),
    actions: {
        GET_SCREEN_WIDTH (res) {
            this.screenWidth = res
        }
    },
    getters: {}
})
