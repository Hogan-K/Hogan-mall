<script setup lang="ts">
interface ProductList {
  title: string;
  image: string;
  price: number;
  onSale?: number
}

defineProps({
  productList: {
    type: Array as PropType<ProductList[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="row q-col-gutter-lg q-px-xl">
    <div v-for="(item, index) in productList" :key="index" class="col-6 col-sm-3">
      <QCard flat>
        <QCardSection class="full-height relative-position q-pa-none">
          <NuxtLink :to="`/products/${item.title}`">
            <QImg class="z-fab product-img-block" fit="contain" :src="item.image" :alt="item.title" :ratio="9/16">
            <template #loading>
              <q-spinner-cube color="primary" />
            </template>
            <template #error>
              <QImg class="bg-transparent" fit="contain" src="img/logo.png" alt="default-image" :ratio="9/16" />
            </template>
          </QImg>
          </NuxtLink>
          <QBtn class="add-cart-btn absolute absolute-center" color="secondary" label="add cart" />
        </QCardSection>

        <QCardSection class="bg-accent text-dark">
          <div class="flex justify-between items-center">
            <p>{{ item.title }}</p>
            <QBtn flat icon="fa-regular fa-bookmark" />
          </div>
          <p>
            <span :class="{ 'cancel-line' : item.onSale }">{{ `NT$ ${item.price}` }}</span>
            <span v-if="item.onSale" class="q-ml-sm text-negative text-size-4 text-weight-medium">{{ item.onSale }}</span>
          </p>
        </QCardSection>
      </QCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cancel-line {
  text-decoration: line-through;
}

.add-cart-btn:hover {
  z-index: 1000 !important;
}

.product-img-block:hover {
  z-index: 0 !important;
}
</style>
