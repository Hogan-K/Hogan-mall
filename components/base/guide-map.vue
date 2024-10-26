<script setup lang="ts">
const route = useRoute()

const path = route.path.startsWith('/') ? route.path.slice(1) : route.path
const guideMap = ref([])
guideMap.value.push(path)
if (route.query.keyword) {
  guideMap.value.push(route.query.keyword)
}
</script>

<template>
  <QBreadcrumbs class="q-pa-xl text-primary" active-color="dark">
    <template #separator>
      <QIcon name="fa-solid fa-angle-right" color="dark" />
    </template>

    <QBreadcrumbsEl icon="fa-solid fa-house" />
    <QBreadcrumbsEl v-for="(item, index) in guideMap" :key="index" :label="item" />
  </QBreadcrumbs>
</template>
