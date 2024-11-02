<script setup lang="ts">
const store = useStore()

const drawerWidth = computed(() => {
  return store.screenWidth > 600 ? 250 : 330
})

const drawerSwitch = ref(false)
onMounted(() => {
  if (store.screenWidth > 600) {
    drawerSwitch.value = true
  }
})

onMounted(() => {
  window.onscroll = () => {

    store.GET_SCREEN_HEIGHT(scrollY)
  }
})

const scrollToTOP = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
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

<!--<style scoped lang="scss">-->
<!--.v-enter-active,-->
<!--.v-leave-active {-->
<!--  transition: opacity 1s;-->
<!--}-->

<!--.v-enter-from,-->
<!--.v-leave-to {-->
<!--  opacity: 0;-->
<!--}-->

<!--.v-enter-to,-->
<!--.v-leave-from {-->
<!--  opacity: 1;-->
<!--}-->
<!--</style>-->
