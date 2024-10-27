<script setup lang="ts">
const store = useStore()

const scrollValue = ref(0)
onMounted(() => {
  window.onscroll = () => {
    scrollValue.value = scrollY
  }
})

const scrollToTOP = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const productList = ref([
  { title: 'BBB', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000, onSale: 880 },
  { title: 'CCC', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000 },
  { title: 'CCC', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000 },
  { title: 'DDD', image: 'https://cdn.quasar.dev/img/mountdsaains.jpg', price: 1000 }
])

const page = ref(1)
</script>

<template>
  <QPage class="q-pa-xl">
    <Base-guide-map />

    <div class="row q-col-gutter-lg q-px-xl">
      <div v-for="(item, index) in productList" :key="index" class="col-6 col-sm-3">
        <base-card :product-info="item" />
      </div>
    </div>
    <Transition>
      <QPageSticky v-if="scrollValue >= 300" position="bottom-right" :offset="[30, 18]">
        <QBtn round color="primary" icon="fa-solid fa-arrow-up" @click="scrollToTOP()" />
      </QPageSticky>
    </Transition>

    <QPagination
        v-model="page"
        direction-links
        boundary-links
        class="q-my-lg justify-center"
        gutter="10px"
        color="grey"
        active-color="primary"
        max="10"
        :max-pages="store.screenWidth <= 600 ? 3 : 10"
    />
  </QPage>
</template>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
