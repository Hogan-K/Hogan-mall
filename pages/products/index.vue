<script setup lang="ts">
const store = useStore()
const { getSingleData } = baseController()

const productList = ref([
  { title: 'BBB', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000, onSale: 880 },
  { title: 'CCC', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000 },
  { title: 'CCC', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000 },
  { title: 'DDD', image: 'https://cdn.quasar.dev/img/mountdsaains.jpg', price: 1000 }
])

const page = ref(1)

// init

</script>

<template>
  <QPage class="q-pa-xl">
    <Base-guide-map />

    <div class="row q-col-gutter-lg q-px-xl">
      <div v-for="(item, index) in productList" :key="index" class="col-6 col-sm-3">
        <base-card :product-info="item" />
      </div>
    </div>

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
