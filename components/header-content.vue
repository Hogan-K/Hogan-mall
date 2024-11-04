<script setup lang="ts">
const drawerSwitch: boolean = defineModel({ type: Boolean })
const router = useRouter()
const $q = useQuasar()
const { t } = useI18n()
const store = useStore()

const searchValue = ref(null)
const search = () => {
  if (searchValue.value) {
    return router.push({ path: '/products', query: { search: searchValue.value } })
  }

  $q.notify({
    message: t('please_enter_keyword'),
    position: 'top-right',
    color: 'negative',
    timeout: 5000
  })
}
</script>

<template>
  <QToolbar>
    <QBtn flat round color="primary" icon="menu"  @click="drawerSwitch = !drawerSwitch" />
    <NuxtLink to="/">
      <QImg src="/img/logo.png" alt="logo" sizes="50px" :ratio="1" style="width: 100px" />
    </NuxtLink>

    <QSpace />

    <QInput
        v-model="searchValue"
        class="search-bar q-mr-sm"
        outlined
        rounded
        dense
        clearable
        clear-icon="backspace"
        :maxlength="15"
        @change="search()"
    >
      <template #append>
        <QIcon name="search" color="primary" />
      </template>
    </QInput>

    <QBtn flat round class="icon-btn q-mr-sm" icon="fa-regular fa-user" size="16px" :color="store.auth.user ? 'primary' : 'dark'" to="/member-area?type=account" />
    <QBtn flat round class="icon-btn q-mr-sm" icon="fa-solid fa-book-bookmark" size="16px" color="dark" to="member-area?type=collection" />
    <QBtn flat dense round class="icon-btn" icon="fa-solid fa-bag-shopping" size="16px" color="dark" to="/cart">
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
