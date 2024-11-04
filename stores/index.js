export const useStore = defineStore('store', {
    state: () => ({
        auth: {},
        userInfo: {},
        screenWidth: 0,
        screenHeight: 0
    }),
    actions: {
        GET_SCREEN_WIDTH (res) {
            this.screenWidth = res
        },
        GET_SCREEN_HEIGHT (res) {
            this.screenHeight = res
        },
        GET_AUTH (res) {
            this.auth = res
        },
        CLEAR_AUTH () {
            this.auth = {}
        },
        GET_USERINFO (res) {
            this.userInfo = res
        }
    },
    getters: {}
})
