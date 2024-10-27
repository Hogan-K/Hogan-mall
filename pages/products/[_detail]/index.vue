<script setup lang="ts">
// props
const productInfo = ref({
  title: '超帥大衣',
  image: 'img/default-product-image.jpg',
  allImage: [
      'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/mountains.jpg',
      'https://cdn.quasar.dev/img/mountains.jpg'
  ],
  price: 1000,
  onSale: 800,
  allSize: ['s', 'm'],
  directions: '大部分商品為預購，如下訂後斷貨將另行通知。\n' +
      '\n' +
      '尺寸皆人工放平衣服測量，多少有1-3公分誤差，不在瑕疵範圍之內。\n' +
      '\n' +
      '商品貨源為韓國批發市場，本賣場為代購服務執行，\n' +
      '\n' +
      '只有瑕疵商品可以代為退換，不適用消保法退換準則，下單視為已經確認並同意內容，\n' +
      '\n' +
      '請詳細閱讀。\n' +
      '\n' +
      '大部分商品為預購，請確認可等待再下單(不接急單＆不接受中途取消)，以免造成誤會引起法律責任。\n'
},)

// ------------------------>
const store = useStore()

const productCarousel = ref(0)

const shoppingOrder = ref({
  title: productInfo.value.title,
  size: '',
  quantity: 1
})
const productQuantityCounter = (type) => {
  if (type === '-' && shoppingOrder.value.quantity > 1) {
    shoppingOrder.value.quantity--
  }

  if (type === '+') {
    shoppingOrder.value.quantity++
  }
}

const getRecommendList = ref([
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  },
  {
    title: 'recommend-1',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    allImage: [],
    price: 1000,
    onSale: 800,
    allSize: ['s', 'm'],
    directions: ''
  }
])

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
            <QCarouselSlide v-for="(item, index) in productInfo.allImage" :key="index" :name="index" :img-src="item" />
          </QCarousel>
        </div>

        <div class="col-12 col-sm-4 text-dark q-mt-md">
          <h1 class="text-size-5 text-weight-medium">{{ productInfo.title }}</h1>
          <p class="q-mt-md">
            <span :class="{ 'cancel-line' : productInfo.onSale }">{{ `NT$ ${productInfo.price}` }}</span>
            <span v-if="productInfo.onSale" class="text-negative text-weight-medium q-ml-sm">{{ `NT$ ${productInfo.price}` }}</span>
          </p>

          <div class="product-quantity-block q-mt-md">
            <QBtn flat label="-" color="primary" @click="productQuantityCounter('-')" />
            <QInput v-model="shoppingOrder.quantity" borderless dense class="text-center" />
            <QBtn flat label="+" color="primary" @click="productQuantityCounter('+')" />
          </div>

          <div class="row q-mt-md">
            <div v-for="(item, index) in productInfo.allSize" :key="index" class="size-select-block col-auto q-mr-sm">
              <QBtn :class="{ 'active-btn' : shoppingOrder.size === item }" flat :label="item" @click="shoppingOrder.size = item" />
            </div>
          </div>

          <div class="row q-mt-md">
            <QBtn label="加入購物車" color="primary" />
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
          transition-prev="slide-right"
          transition-next="slide-left"
          control-color="primary"
          class="bg-accent q-mt-md"
      >
        <QCarouselSlide v-for="(item, index) in recommendList" :key="index" :name="`recommend-${index}`">
          <div class="row fit flex-center no-wrap">
            <base-card v-for="(imageItem, imageIndex) in item" :key="imageIndex" :class="{ 'q-ml-md' : imageIndex !== 0 }" :product-info="imageItem" />
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
