<script setup lang="ts">
const route = useRoute()
const store = useStore()
const { getSingleData, searchProducts } = baseController()

const productList = ref([])

const getCollectionItem = async () => {
  const collectionList = (await getSingleData('collection', store.auth.user.uid)).list
  const collectionMap = collectionList.reduce((acc, cur) => {
    acc[cur.title] = cur
    return acc
  }, {})

  productList.value.forEach((item) => {
    const hasItem = !!collectionMap[item.title]
    if (hasItem) {
      item.isCollection = true
    }
  })
}
const initData = async (query) => {
  try {
    if (query.search) {
      return  productList.value = await searchProducts(query.search)
    }

    if (query.keyword) {
      return productList.value = (await getSingleData('products', query.type))[query.keyword]
    }

    if (query.type === 'latest_products') {
      return productList.value = (await getSingleData('recommendation_products', 'content')).list
    }

    if (query.type !== 'all') {
      const res = (await getSingleData('products', query.type))
      const currData = []
      for (const key in res) {
        currData.push(...res[key])
      }
      productList.value = currData
    } else {
      productList.value = (await getSingleData('products', query.type)).list
    }
  } finally {
    totalPage.value = Math.ceil(productList.value.length / 12)
  }
}

// pagination
const totalPage = ref(1)
const page = ref(1)
const showProductList = computed(() => {
  return productList.value.slice((page.value -1 ) * 12, page.value * 12)
})
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
watch(page, () => {
  scrollToTop()
})

// init
initData(route.query)
if (store.auth.user && store.userInfo.email) {
  getCollectionItem()
}

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
      <div v-for="(item, index) in showProductList" :key="index" class="col-6 col-sm-3">
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
