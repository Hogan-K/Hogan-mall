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
    </QPageContainer>
  </QLayout>
</template>
