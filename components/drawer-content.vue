<script setup lang="ts">
const listActiveValue = ref<null|string>(null)

const sideBarList = ref([
  { title: 'home', icon: 'home', to: '/' },
  { title: 'membersArea', icon: 'perm_identity', to: '/' },
  { title: 'latestProducts', icon: 'local_fire_department', to: '/' },
  { title: 'allProducts', icon: 'fa-solid fa-border-all', to: '/products' },
  {
    title: 'top',
    icon: 'bookmarks',
    classify: [
      { title: 'topAll', icon: 'turned_in_not', to: '/' },
      { title: 'shirt', icon: 'turned_in_not', to: '/' },
      { title: 'knit', icon: 'turned_in_not', to: '/' },
      { title: 'vest', icon: 'turned_in_not', to: '/' }
    ]
  },
  {
    title: 'outer',
    icon: 'bookmarks',
    classify: [
      { title: 'outerAll', icon: 'turned_in_not', to: '/' },
      { title: 'blazer', icon: 'turned_in_not', to: '/' },
      { title: 'overcoat', icon: 'turned_in_not', to: '/' },
      { title: 'jacket', icon: 'turned_in_not', to: '/' }
    ]
  },
  {
    title: 'bottom',
    icon: 'bookmarks',
    classify: [
      { title: 'bottomAll', icon: 'turned_in_not', to: '/' },
      { title: 'slacks', icon: 'turned_in_not', to: '/' },
      { title: 'jeans', icon: 'turned_in_not', to: '/' },
      { title: 'pants', icon: 'turned_in_not', to: '/' }
    ]
  },
  {
    title: 'acc',
    icon: 'bookmarks',
    classify: [
      { title: 'accAll', icon: 'turned_in_not', to: '/' },
      { title: 'bag', icon: 'turned_in_not', to: '/' },
      { title: 'shoes', icon: 'turned_in_not', to: '/' },
      { title: 'hat', icon: 'turned_in_not', to: '/' }
    ]
  }
])
</script>

<template>
  <QScrollArea class="fit">
    <QList focused padding bordered>
      <div v-for="(item, index) in sideBarList" :key="index">
        <QItem
            v-if="!(item.classify)"
            v-ripple
            clickable
            active-class="list-active-class"
            :active="listActiveValue === item.title"
            :to="item.to"
            @click="listActiveValue = item.title"
        >
          <QItemSection avatar>
            <QAvatar text-color="dark" :icon="item.icon" />
          </QItemSection>
          <QItemSection>
            {{ $t(item.title) }}
          </QItemSection>
        </QItem>

        <QExpansionItem
            v-else
            switch-toggle-side
            :icon="item.icon"
            :label="$t(item.title)"
        >
          <QList>
            <QItem
                v-for="(classifyItem, classifyIndex) in item.classify"
                :key="classifyIndex"
                v-ripple
                clickable
                active-class="list-active-class"
                :to="classifyItem.to"
                :active="listActiveValue === classifyItem.title"
                @click="listActiveValue = classifyItem.title"
            >
              <QItemSection avatar>
                <QAvatar text-color="dark" :icon="classifyItem.icon" />
              </QItemSection>
              <QItemSection>
                {{ $t(classifyItem.title) }}
              </QItemSection>
            </QItem>
          </QList>
        </QExpansionItem>
      </div>
    </QList>
  </QScrollArea>
</template>

<style scoped lang="scss">
.list-active-class {
  color: var(--q-accent);
  background: var(--q-primary);
}
</style>
