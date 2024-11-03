<script setup lang="ts">
const { getSingleData } = baseController()

const store = useStore()

const carousel = ref(0)
const carouselOption = ref([])

const guidedTourLink = ref([])

const productList = ref([])

// init
const currCarouselOption = await getSingleData('advertising_carousel', 'content')
carouselOption.value = currCarouselOption.list
const currGuidedTourLink = await getSingleData('recommendation_classify', 'content')
guidedTourLink.value = currGuidedTourLink.list
const currProductList = await getSingleData('recommendation_products', 'content')
productList.value = currProductList.list
</script>

<template>
  <QPage>
    <QCarousel
        v-model="carousel"
        infinite
        animated
        autoplay
        class="carousel-block border-radius-inherit"
        transition-prev="slide-right"
        transition-next="slide-left"
        :class="{ 'carousel-scale' : store.screenHeight > 300 }"
        :height="store.screenWidth > 600 ? '600px': '300px'"
    >
      <QCarouselSlide v-for="(item, index) in carouselOption" :key="index" :name="index" :img-src="item" />
    </QCarousel>

    <div class="q-pa-lg">
      <!-- h1 is hidden -->
      <h1 class="text-size-5 invisible">Hogan Mall Home</h1>
      <h2 class="slogan text-center text-size-8">Fashion Enhances You</h2>

      <div class="row q-mt-md">
        <div v-for="(item, index) in guidedTourLink" :key="index" class="col-6 col-sm-3 q-my-md text-center">
          <NuxtLink :to="`/products?type=${$t(item.title)}`">
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
