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
  { title: 'BBB', image: 'img/default-product-image.jpg', price: 1000 },
  { title: 'CCC', image: 'img/default-product-image.jpg', price: 1000 },
  { title: 'CCC', image: 'img/default-product-image.jpg', price: 1000 },
  { title: 'DDD', image: 'img/default-product-image.jpg', price: 1000 }
])

const page = ref(1)
</script>

<template>
  <QPage>
    <Base-guide-map />

    <base-card :product-list="productList" />

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
