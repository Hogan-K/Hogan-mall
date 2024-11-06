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
const { t } = useI18n()

const productInfo = computed(() => props.productInfo)

const addCollection = async () => {
  if (!store.auth.uid) {
    $q.notify({
      message: t('please_login_first'),
      position: 'top-right',
      color: 'negative'
    })
    return router.push({ path: '/login' })
  }

  // 取消收藏
  if (productInfo.value.isCollection) {
    delete productInfo.value.isCollection
    return deleteCartOrCollection('collection', store.auth.uid, productInfo.value)
  }

  // 加入收藏
  await addCartOrCollection('collection', store.auth.uid, productInfo.value)
  productInfo.value.isCollection = !productInfo.value.isCollection
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
.card-title {
  word-break: break-word;
}

.product-img-block {
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
