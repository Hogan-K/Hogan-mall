<script setup lang="ts">
const drawerSwitch: boolean = defineModel({ type: Boolean })
const { authSignOut } = baseAuth()
const router = useRouter()
const $q = useQuasar()
const { t } = useI18n()
const store = useStore()

const dropdownBtnColor = computed(() => store.auth.uid ? '--q-primary' : '--q-dark')
const dropdownBtnList = ref([
  { label: 'account_info', direct: '/member-area?type=account' },
  { label: 'collection', direct: 'member-area?type=collection' },
  { label: 'cart', direct: '/cart' }
])

const searchValue = ref(null)
const search = () => {
  if (searchValue.value) {
    return router.push({ path: '/products', query: { search: searchValue.value } })
  }

  $q.notify({
    message: t('please_enter_keyword'),
    position: 'top-right',
    color: 'negative'
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

    <div v-if="store.screenWidth >= 600">
      <QBtn flat round class="icon-btn-disable-hover q-mr-sm" icon="fa-regular fa-user" size="16px" :color="store.auth.uid ? 'primary' : 'dark'" to="/member-area?type=account" />
      <QBtn flat round class="icon-btn-disable-hover q-mr-sm" icon="fa-solid fa-book-bookmark" size="16px" color="dark" to="member-area?type=collection" />
      <QBtn flat dense round class="icon-btn-disable-hover" icon="fa-solid fa-bag-shopping" size="16px" color="dark" to="/cart">
        <QBadge transparent floating :label="store.getCartAmount" />
      </QBtn>
    </div>

    <QBtnDropdown
        v-else
        flat
        round
        auto-close
        class="dropdown-btn icon-btn-disable-hover"
        size="16px"
        dropdown-icon="none"
        icon="fa-regular fa-user"
        :color="store.auth.uid ? 'primary' : 'dark'"
    >
      <QList class="text-center">
        <QItem v-for="(item, index) in dropdownBtnList" :key="index" clickable style="color: var(--q-dark)" :to="item.direct">
          <QItemSection>
            <QItemLabel>{{ $t(item.label) }}</QItemLabel>
          </QItemSection>
        </QItem>
        <QItem v-if="store.auth.uid" clickable @click="authSignOut()">
          <QItemSection>
            <QItemLabel>{{ $t('sign_out') }}</QItemLabel>
          </QItemSection>
        </QItem>
        <QItem v-else clickable to="/login">
          <QItemSection>
            <QItemLabel>{{ $t('login') }}</QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </QBtnDropdown>
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

.icon-btn-disable-hover {
  // 取消預設hover
  .q-focus-helper {
    background-color: transparent !important
  }
  .q-btn__content:hover {
    color: var(--q-secondary)
  }
}

.dropdown-btn {
  .q-btn__content {
    .q-btn-dropdown__arrow-container {
      display: none;
    }
  }
}
</style>
