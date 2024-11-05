export const useStore = defineStore('store', {
    state: () => ({
        auth: {},
        screenWidth: 0,
        screenHeight: 0,
        cartAmount: 0
    }),
    actions: {
        GET_SCREEN_WIDTH (res) {
            this.screenWidth = res
        },
        GET_SCREEN_HEIGHT (res) {
            this.screenHeight = res
        },
        UPDATE_AUTH (res) {
            this.auth = res
        },
        UPDATE_CART_AMOUNT (res) {
            this.cartAmount = res
        }
    },
    getters: {
        getCartAmount () {
            return this.cartAmount
        }
    }
})
