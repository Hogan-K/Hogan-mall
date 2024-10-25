<script setup lang="ts">
const listActiveValue = ref<null|string>(null)

const sideBarList = ref([
  { title: 'home', icon: 'home' },
  { title: 'membersArea', icon: 'perm_identity' },
  { title: 'latestProducts', icon: 'local_fire_department' },
  {
    title: 'top',
    icon: 'bookmarks',
    classify: [
      { title: 'topAll', icon: 'turned_in_not' },
      { title: 'shirt', icon: 'turned_in_not' },
      { title: 'knit', icon: 'turned_in_not' },
      { title: 'vest', icon: 'turned_in_not' }
    ]
  },
  {
    title: 'outer',
    icon: 'bookmarks',
    classify: [
      { title: 'outerAll', icon: 'turned_in_not' },
      { title: 'blazer', icon: 'turned_in_not' },
      { title: 'overcoat', icon: 'turned_in_not' },
      { title: 'jacket', icon: 'turned_in_not' }
    ]
  },
  {
    title: 'bottom',
    icon: 'bookmarks',
    classify: [
      { title: 'bottomAll', icon: 'turned_in_not' },
      { title: 'slacks', icon: 'turned_in_not' },
      { title: 'jeans', icon: 'turned_in_not' },
      { title: 'pants', icon: 'turned_in_not' }
    ]
  },
  {
    title: 'acc',
    icon: 'bookmarks',
    classify: [
      { title: 'accAll', icon: 'turned_in_not' },
      { title: 'bag', icon: 'turned_in_not' },
      { title: 'shoes', icon: 'turned_in_not' },
      { title: 'hat', icon: 'turned_in_not' }
    ]
  }
])
</script>

<template>
  <QScrollArea class="fit">
    <QList focused padding bordered>
      <template v-for="(item, index) in sideBarList">
        <QItem
            v-if="!(item.classify)"
            v-ripple
            clickable
            active-class="list-active-class"
            :active="listActiveValue === item.title"
            :key="index"
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
      </template>
    </QList>
  </QScrollArea>
</template>

<style scoped lang="scss">
.list-active-class {
  color: var(--q-accent);
  background: var(--q-primary);
}
</style>
