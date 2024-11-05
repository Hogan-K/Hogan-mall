<script setup lang="ts">
interface ProductList {
  title: string;
  image: string;
  price: number;
  onSale?: number;
  isCollection?: boolean;
}

const props = defineProps({
  productInfo: {
    type: Object as PropType<ProductList>,
    default: () => {}
  }
})

// ---------------------------------->
const { addCartOrCollection, deleteCartOrCollection } = baseController()
const store = useStore()
const router = useRouter()
const $q = useQuasar()

const productInfo = computed(() => props.productInfo)

const addCollection = async () => {
  if (!store.auth.user || !store.userInfo.email) {
    $q.notify({
      message: '請先登入',
      position: 'top-right',
      color: 'negative'
    })
    return router.push({ path: '/login' })
  }

  // 取消收藏
  if (productInfo.value.isCollection) {
    delete productInfo.value.isCollection
    return deleteCartOrCollection('collection', store.auth.user.uid, productInfo.value)
  }

  // 加入收藏
  await addCartOrCollection('collection', store.auth.user.uid, productInfo.value)
  productInfo.value.isCollection = !productInfo.value.isCollection
}

const addCart = async () => {
  if (!store.auth.user || !store.userInfo.email) {
    $q.notify({
      message: '請先登入',
      position: 'top-right',
      color: 'negative'
    })
    return router.push({ path: '/login' })
  }

  addCartOrCollection('cart', store.auth.user.uid, productInfo.value)
}
</script>

<template>
  <QCard flat>
    <QCardSection class="full-height relative-position q-pa-none overflow-hidden">
      <NuxtLink :to="`/products/${productInfo.title}`">
        <QImg class="product-img-block" fit="contain" :src="productInfo.image" :alt="productInfo.title" :ratio="9/16">
        <template #loading>
          <q-spinner-cube color="primary" />
        </template>
        <template #error>
          <QImg class="bg-transparent" fit="contain" src="img/default-product-image.jpg" alt="default-image" :ratio="9/16" />
        </template>
      </QImg>
      </NuxtLink>
      <QBtn class="add-cart-btn absolute absolute-center" color="secondary" :label="$t('add_cart')" @click="addCart()" />
    </QCardSection>

    <QCardSection class="row bg-accent text-dark">
      <div class="col">
        <p class="card-title">{{ productInfo.title }}</p>
      </div>
      <div class="col-1">
        <QBtn flat class="q-px-xs" :icon="productInfo.isCollection ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'" @click="addCollection()" />
      </div>
      <div class="col-12">
        <p>
          <span :class="{ 'cancel-line' : productInfo.onSale > 0 }">{{ `NT$ ${productInfo.price}` }}</span>
          <span v-if="productInfo.onSale > 0" class="q-ml-sm text-negative text-size-4 text-weight-medium">{{ productInfo.onSale }}</span>
        </p>
      </div>
    </QCardSection>
  </QCard>
</template>

<style scoped lang="scss">
.add-cart-btn {
  white-space: nowrap;
  &:hover {
    z-index: 2;
  }
}

.card-title {
  word-break: break-word;
}

.product-img-block {
  z-index: 1;
  transition: 0.5s;
  &:hover {
    z-index: 0 !important;
    transform: scale(1.1);
  }
}
</style>
