<script setup>
const store = useStore()

onMounted(() => {
  store.GET_SCREEN_WIDTH(window.innerWidth)
  window.onresize = (val) => {
    store.GET_SCREEN_WIDTH(val.target.innerWidth)
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@for $i from 1 to 11 {
  .text-size-#{$i} {
    font-size: $i * 4px;
  }

  @media (min-width: $breakpoint-sm-min) {
    .text-size-sm-#{$i} {
      font-size: $i * 4px;
    }
  }

  @media (min-width: $breakpoint-md-min) {
    .text-size-sm-#{$i} {
      font-size: $i * 4px;
    }
  }
}

// css reset
p {
  margin-bottom: 0;
}
</style>
