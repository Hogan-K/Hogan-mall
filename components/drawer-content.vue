<script setup lang="ts">
const listActiveValue = ref<null|string>(null)

const sideBarList = ref([
  { title: 'home', icon: 'fa-solid fa-house', to: '/' },
  { title: 'member_area', icon: 'fa-regular fa-user', to: '/member-area?type=account' },
  { title: 'latest_products', icon: 'fa-solid fa-fire', to: '/products?type=latest_products' },
  { title: 'all_products', icon: 'fa-solid fa-border-all', to: '/products?type=all' },
  {
    title: 'top',
    icon: 'fa-solid fa-tags',
    classify: [
      { title: 'top_all', icon: 'fa-solid fa-tag', to: '/products?type=top' },
      { title: 'shirt', icon: 'fa-solid fa-tag', to: '/products?type=top&keyword=shirt' },
      { title: 'knit', icon: 'fa-solid fa-tag', to: '/products?type=top&keyword=knit' },
      { title: 'cotton_coat', icon: 'fa-solid fa-tag', to: '/products?type=top&keyword=cotton_coat' }
    ]
  },
  {
    title: 'outer',
    icon: 'fa-solid fa-tags',
    classify: [
      { title: 'outer_all', icon: 'fa-solid fa-tag', to: '/products?type=outer' },
      { title: 'blazer', icon: 'fa-solid fa-tag', to: '/products?type=outer&keyword=blazer' },
      { title: 'overcoat', icon: 'fa-solid fa-tag', to: '/products?type=outer&keyword=overcoat' },
      { title: 'jacket', icon: 'fa-solid fa-tag', to: '/products?type=outer&keyword=jacket' }
    ]
  },
  {
    title: 'bottom',
    icon: 'fa-solid fa-tags',
    classify: [
      { title: 'bottom_all', icon: 'fa-solid fa-tag', to: '/products?type=bottom' },
      { title: 'slacks', icon: 'fa-solid fa-tag', to: '/products?type=bottom&keyword=slacks' },
      { title: 'jeans', icon: 'fa-solid fa-tag', to: '/products?type=bottom&keyword=jeans' },
      { title: 'pants', icon: 'fa-solid fa-tag', to: '/products?type=bottom&keyword=pants' }
    ]
  },
  {
    title: 'acc',
    icon: 'fa-solid fa-tags',
    classify: [
      { title: 'acc_all', icon: 'fa-solid fa-tag', to: '/products?type=acc' },
      { title: 'bag', icon: 'fa-solid fa-tag', to: '/products?type=acc&keyword=bag' },
      { title: 'shoes', icon: 'fa-solid fa-tag', to: '/products?type=acc&keyword=shoes' },
      { title: 'other', icon: 'fa-solid fa-tag', to: '/products?type=acc&keyword=other' }
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
