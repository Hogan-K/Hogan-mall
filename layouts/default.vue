<script setup>
const store = useStore()
const { getSingleData } = baseController()

const drawerWidth = computed(() => store.screenWidth > 600 ? 250 : 330)

const drawerSwitch = ref(false)

const scrollToTOP = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getCartAmount = async () => {
  if (store.auth.uid) {
    const cartList = (await getSingleData('cart', store.auth.uid)).list || []
    store.UPDATE_CART_AMOUNT(cartList.length)
  }
}

onMounted(() => {
  getCartAmount()

  if (store.screenWidth > 600) {
    drawerSwitch.value = true
  }
  window.onscroll = () => {
    store.GET_SCREEN_HEIGHT(scrollY)
  }

  store.GET_SCREEN_WIDTH(window.innerWidth)
  window.onresize = (val) => {
    store.GET_SCREEN_WIDTH(val.target.innerWidth)
  }
})

onUpdated(() => {
  getCartAmount()
})
</script>

<template>
  <QLayout view="hHh LpR fff">
    <QHeader elevated class="bg-accent">
      <HeaderContent v-model="drawerSwitch" />
    </QHeader>

    <QDrawer v-model="drawerSwitch" :width="drawerWidth" class="bg-accent" :breakpoint="600" elevated overlay>
      <DrawerContent />
    </QDrawer>

    <QFooter class="bg-dark">
      <FooterContent />
    </QFooter>

    <QPageContainer class="bg-accent">
      <slot />
      <Transition>
        <QPageSticky v-if="store.screenHeight >= 300" class="z-top" position="bottom-right" :offset="[30, 18]">
          <QBtn round color="primary" icon="fa-solid fa-arrow-up" @click="scrollToTOP()" />
        </QPageSticky>
      </Transition>
    </QPageContainer>
  </QLayout>
</template>
