<script setup lang="ts">
const drawerSwitch: boolean = defineModel({ type: Boolean })

const search = ref(null)
</script>

<template>
  <QToolbar>
    <QBtn flat round color="primary" icon="menu"  @click="drawerSwitch = !drawerSwitch" />
    <NuxtLink to="/">
      <QImg src="/img/logo.png" alt="logo" sizes="50px" :ratio="1" style="width: 100px" />
    </NuxtLink>

    <QSpace />

    <QInput
        v-model="search"
        class="search-bar q-mr-sm"
        outlined
        rounded
        dense
        clearable
        clear-icon="backspace"
        :maxlength="15"
    >
      <template #append>
        <QIcon name="search" color="primary" />
      </template>
    </QInput>

    <QBtn flat round class="icon-btn q-mr-sm" icon="perm_identity" size="16px" color="dark" />
    <QBtn flat round class="icon-btn q-mr-sm" icon="bookmarks" size="16px" color="dark" />
    <QBtn flat dense round class="icon-btn" icon="local_mall" size="16px" color="dark">
      <QBadge transparent floating label="1" />
    </QBtn>
  </QToolbar>
</template>

<style lang="scss">
.search-bar {
  .q-field__native {
    transition: ease-in-out 0.6s;

    &:focus {
      width: 250px;
    }
  }
}

.icon-btn {
  // 取消預設hover
  .q-focus-helper {
    background-color: transparent !important
  }
  .q-btn__content:hover {
    color: var(--q-secondary)
  }
}
</style>
