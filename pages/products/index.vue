<script setup lang="ts">
const route = useRoute()
const store = useStore()
const { getSingleData, searchProducts } = baseController()


const productList = ref([])
const currProductList = ref([])

const initData = async (query) => {
  try {
    if (query.search) {
      return  currProductList.value = await searchProducts(query.search)
    }

    if (query.keyword) {
      return currProductList.value = (await getSingleData('products', query.type))[query.keyword]
    }

    if (query.type !== 'all') {
      const res = (await getSingleData('products', query.type))
      const currData = []
      for (const key in res) {
        currData.push(...res[key])
      }
      currProductList.value = currData
    } else {
      currProductList.value = (await getSingleData('products', query.type)).list
    }
  } finally {
    totalPage.value = Math.ceil(currProductList.value.length / 12)
    productList.value = pagination.value
  }
}

const totalPage = ref(1)
const page = ref(1)
const pagination = computed(() => {
  return currProductList.value.slice((page.value -1 ) * 12, page.value * 12)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


watch(page, () => {
  productList.value = pagination.value
  scrollToTop()
})

// init
initData(route.query)
watch(() => route, ({ query }) => {
  page.value = 1
  initData(query)
  scrollToTop()
}, { deep: true })
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
        :max="totalPage"
        :max-pages="store.screenWidth <= 600 ? 3 : 10"
    />
  </QPage>
</template>
