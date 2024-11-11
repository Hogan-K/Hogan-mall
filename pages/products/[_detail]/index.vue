<script setup lang="ts">
const store = useStore()
const route = useRoute()
const $q = useQuasar()
const { t } = useI18n()
const { searchProducts, getSingleData, addCartOrCollection } = baseController()

const productInfo = ref((await searchProducts(route.params._detail))[0] || {})

const productCarousel = ref(0)

const getRandomInt = () => {
  return Math.floor(Math.random() * 100000000);
}

const shoppingOrder = ref({
  id: getRandomInt(),
  title: productInfo.value.title || '',
  image: productInfo.value.image || '',
  size: '',
  quantity: 1,
  price: Number(productInfo.value.price) || 0,
  onSale: Number(productInfo.value.onSale) || 0
})

const productQuantityCounter = (type) => {
  if (type === '-' && shoppingOrder.value.quantity > 1) {
    shoppingOrder.value.quantity--
  }

  if (type === '+') {
    shoppingOrder.value.quantity++
  }
}

const getRecommendList = ref((await getSingleData('recommendation_products', 'content')).list || [])
const recommendCarousel = ref('recommend-0')
const recommendList = ref({})

const divide = (itemLimited) => {
  const loop = Math.ceil(getRecommendList.value.length / itemLimited)
  for (let i = 0; i < loop; i++) {
    recommendList.value[i] = getRecommendList.value.slice(i * itemLimited, i * itemLimited + itemLimited)
  }
}
onMounted(() => {
  if (store.screenWidth < 600) {
    divide(1)
  } else if (store.screenWidth < 760) {
    divide(2)
  } else if (store.screenWidth < 960) {
    divide(3)
  } else {
    divide(4)
  }
})

const getCartAmount = async () => {
  const cartList = (await getSingleData('cart', store.auth.uid)).list || []
  store.UPDATE_CART_AMOUNT(cartList.length)
}

const addCart = async () => {
  if (!store.auth.uid) {
    $q.notify({
      message: t('please_login_first'),
      position: 'top-right',
      color: 'negative'
    })
    return router.push({ path: '/login' })
  }

  if (!shoppingOrder.value.size) {
    return $q.notify({
      message: t('please_choose_size'),
      position: 'top-right',
      color: 'negative'
    })
  }

  await addCartOrCollection('cart', store.auth.uid, shoppingOrder.value)
  getCartAmount()
  shoppingOrder.value.id = getRandomInt()
}

</script>

<template>
  <QPage>
    <div class="q-pa-xl">
      <div class="row">
        <div class="col-12 col-sm-6 q-mr-auto">
          <QCarousel
              v-model="productCarousel"
              animated
              arrows
              thumbnails
              infinite
              class="carousel-block bg-accent"
              transition-prev="scale"
              transition-next="scale"
              control-color="accent"
              control-type="flat"
          >
            <QCarouselSlide v-for="(item, index) in productInfo.all_image" :key="index" :name="index" :img-src="item" />
          </QCarousel>
        </div>

        <div class="col-12 col-sm-4 text-dark q-mt-md">
          <h1 class="text-size-5 text-weight-medium">{{ productInfo.title }}</h1>
          <p class="q-mt-md">
            <span :class="{ 'cancel-line' : productInfo.onSale > 0 }">{{ `NT$ ${productInfo.price}` }}</span>
            <span v-if="productInfo.onSale > 0" class="text-negative text-weight-medium q-ml-sm">{{ `NT$ ${productInfo.price}` }}</span>
          </p>

          <div class="product-quantity-block q-mt-md">
            <QBtn flat label="-" color="primary" @click="productQuantityCounter('-')" />
            <QInput v-model="shoppingOrder.quantity" borderless dense class="text-center" />
            <QBtn flat label="+" color="primary" @click="productQuantityCounter('+')" />
          </div>

          <div class="row q-mt-md">
            <div v-for="(item, index) in productInfo.all_size" :key="index" class="size-select-block col-auto q-mr-sm">
              <QBtn :class="{ 'active-btn' : shoppingOrder.size === item }" flat :label="item" @click="shoppingOrder.size = item" />
            </div>
          </div>

          <div class="row q-mt-md">
            <QBtn label="加入購物車" color="primary" @click="addCart()" />
          </div>
        </div>
      </div>

      <div class="q-mt-xl">
        <h2 class="text-size-6 text-weight-regular">商品介紹</h2>
        <p class="text-size-4" style="line-height: 4">{{ productInfo.directions }}</p>
      </div>
    </div>

    <div class="q-mt-xl">
      <h2 class="text-size-6 text-weight-regular q-px-xl">推薦商品</h2>
      <QCarousel
          v-model="recommendCarousel"
          animated
          arrows
          infinite
          padding
          height="auto"
          transition-prev="slide-right"
          transition-next="slide-left"
          control-color="primary"
          class="bg-accent q-mt-md"
      >
        <QCarouselSlide v-for="(item, index) in recommendList" :key="index" class="row justify-around q-col-gutter-md" :name="`recommend-${index}`">
          <div v-for="(imageItem, imageIndex) in item" :key="imageIndex" class="col-6 col-sm-3">
            <base-card :product-info="imageItem" />
          </div>
        </QCarouselSlide>
      </QCarousel>
    </div>
  </QPage>
</template>

<style lang="scss">
.carousel-block {
  .q-carousel__control {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.product-quantity-block {
  display: inline-flex;
  border-radius: 10px;
  border: 1px solid var(--q-dark);

  &:hover, &:focus{
    border-color: var(--q-primary);
  }

  input {
    text-align: center;
  }
}

.size-select-block {
  border: 1px solid var(--q-dark);
  border-radius: 10px;

  .active-btn {
    background: var(--q-primary);
    color: var(--q-accent);
    border-radius: 8px;
    opacity: 0.3;
  }
}
</style>
