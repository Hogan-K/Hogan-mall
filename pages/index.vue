<script setup lang="ts">
const { t } = useI18n()

const scrollValue = ref(0)
onMounted(() => {
  window.onscroll = () => {
    scrollValue.value = scrollY
  }
})

const carousel = ref(0)
const carouselOption = ref([
    'https://cdn.quasar.dev/img/mountains.jpg',
    'https://cdn.quasar.dev/img/parallax1.jpg',
    'https://cdn.quasar.dev/img/parallax2.jpg',
    'https://cdn.quasar.dev/img/quasar.jpg'
])

const guidedTourLink = ref([
  { title: 'latest_products', image: 'https://cdn.quasar.dev/img/mountains.jpg', to: `/products?keyword=${t('latest_products')}` },
  { title: 'outer_all', image: 'https://cdn.quasar.dev/img/parallax1.jpg', to: `/products?keyword=${t('outer_all')}` },
  { title: 'bottom_all', image: 'https://cdn.quasar.dev/img/parallax2.jpg', to: `/products?keyword=${t('bottom_all')}` },
  { title: 'top_all', image: 'https://cdn.quasar.dev/img/quasar.jpg', to: `/products?keyword=${t('top_all')}` }
])

const productList = ref([
  { title: 'BBB', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000, onSale: 880 },
  { title: 'CCC', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000 },
  { title: 'CCC', image: 'https://cdn.quasar.dev/img/mountains.jpg', price: 1000 },
  { title: 'DDD', image: 'https://cdn.quasar.dev/img/mountdsaains.jpg', price: 1000 }
])
</script>

<template>
  <QPage>
    <QCarousel
        v-model="carousel"
        infinite
        animated
        autoplay
        height="600px"
        class="carousel-block border-radius-inherit"
        transition-prev="slide-right"
        transition-next="slide-left"
        :class="{ 'carousel-scale' : scrollValue > 300 }"
    >
      <QCarouselSlide v-for="(item, index) in carouselOption" :key="index" :name="index" :img-src="item" />
    </QCarousel>

    <div class="q-pa-lg">
      <!-- h1 is hidden -->
      <h1 class="text-size-5 invisible">Hogan Mall Home</h1>
      <h2 class="slogan text-center text-size-8">Fashion Enhances You</h2>

      <div class="row q-mt-md">
        <div v-for="(item, index) in guidedTourLink" :key="index" class="col-6 col-sm-3 text-center">
          <NuxtLink :to="item.to">
            <QImg class="guided-tour-link-image shadow-16" ratio="1" :src="item.image" :alt="`${item.title}-image`" style="border-radius: 10px" width="80%">
              <div class="fit flex flex-center text-size-5 text-weight-medium">
                {{ $t(item.title) }}
              </div>
            </QImg>
          </NuxtLink>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mt-xl">
        <div v-for="(item, index) in productList" :key="index" class="col-6 col-sm-3">
          <Base-card :product-info="item" />
        </div>
      </div>

      <div class="text-center q-mt-lg">
        <QBtn rounded label="more" color="primary" to="/products" />
      </div>

    </div>
  </QPage>
</template>

<style scoped lang="scss">
.carousel-block {
  transition: 1s;
}
.carousel-scale {
  transform: scale(0.9);
  border-radius: 20px;
}

.slogan {
  font-family: 'Cochin';
}

.guided-tour-link-image {
  transition: 1s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
