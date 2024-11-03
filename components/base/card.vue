<script setup lang="ts">
interface ProductList {
  title: string;
  image: string;
  price: number;
  onSale?: number
}

defineProps({
  productInfo: {
    type: Object as PropType<ProductList>,
    default: () => {}
  }
})
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
      <QBtn class="add-cart-btn absolute absolute-center" color="secondary" :label="$t('add_cart')" />
    </QCardSection>

    <QCardSection class="row bg-accent text-dark">
      <div class="col">
        <p class="card-title">{{ productInfo.title }}</p>
      </div>
      <div class="col-1">
        <QBtn flat class="q-px-xs" icon="fa-regular fa-bookmark" />
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
