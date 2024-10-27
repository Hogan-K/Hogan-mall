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
    <QCardSection class="full-height relative-position q-pa-none">
      <NuxtLink :to="`/products/${productInfo.title}`">
        <QImg class="z-fab product-img-block" fit="contain" :src="productInfo.image" :alt="productInfo.title" :ratio="9/16">
        <template #loading>
          <q-spinner-cube color="primary" />
        </template>
        <template #error>
          <QImg class="bg-transparent" fit="contain" src="img/default-product-image.jpg" alt="default-image" :ratio="9/16" />
        </template>
      </QImg>
      </NuxtLink>
      <QBtn class="add-cart-btn absolute absolute-center" color="secondary" label="add cart" />
    </QCardSection>

    <QCardSection class="bg-accent text-dark">
      <div class="flex justify-between items-center">
        <p>{{ productInfo.title }}</p>
        <QBtn flat icon="fa-regular fa-bookmark" />
      </div>
      <p>
        <span :class="{ 'cancel-line' : productInfo.onSale }">{{ `NT$ ${productInfo.price}` }}</span>
        <span v-if="productInfo.onSale" class="q-ml-sm text-negative text-size-4 text-weight-medium">{{ productInfo.onSale }}</span>
      </p>
    </QCardSection>
  </QCard>
</template>

<style scoped lang="scss">
.add-cart-btn:hover {
  z-index: 1000 !important;
}

.product-img-block:hover {
  z-index: 0 !important;
}
</style>
