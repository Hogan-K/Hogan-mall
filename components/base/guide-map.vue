<script setup lang="ts">
const route = useRoute()

const guideMapItemList = route.path.split('/')
//  因為切完 path 後，index[0] 會是空字串，所以刪除 index[0]
guideMapItemList.shift()
const guideMap = ref([])
guideMap.value.push(...guideMapItemList)
if (route.query.keyword) {
  guideMap.value.push(route.query.keyword)
}
</script>

<template>
  <QBreadcrumbs class="q-pa-lg text-primary" active-color="dark">
    <template #separator>
      <QIcon name="fa-solid fa-angle-right" color="dark" />
    </template>

    <QBreadcrumbsEl icon="fa-solid fa-house" />
    <QBreadcrumbsEl v-for="(item, index) in guideMap" :key="index" :label="item" />
  </QBreadcrumbs>
</template>
