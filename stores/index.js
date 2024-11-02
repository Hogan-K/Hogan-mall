export const useStore = defineStore('store', {
    state: () => ({
        screenWidth: 0,
        screenHeight: 0
    }),
    actions: {
        GET_SCREEN_WIDTH (res) {
            this.screenWidth = res
        },
        GET_SCREEN_HEIGHT (res) {
            this.screenHeight = res
        }
    },
    getters: {}
})
