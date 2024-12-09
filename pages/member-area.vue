<script setup>
definePageMeta({
  middleware: 'auth'
})

const { getSingleData, saveUserInfo } = baseController()
const { required, name, cellphone, email } = baseInput()
const route = useRoute()
const router = useRouter()
const store = useStore()
const $q = useQuasar()
const { t } = useI18n()

const tab = ref(route.query.type?? 'account')
watch(tab, (val) => {
  router.push({ path: route.path, query: { type: val } })
})
watch(() => route.query, (val) => {
  tab.value = val.type
})


// account block
const accountInfo = ref({
  name: '',
  cellphone: '',
  email: '',
  gender: '',
  birthday: ''
})

const rules = { name, cellphone, email }
const genderSelectOption = [
  'male',
  'female'
]

const form = ref(null)
const onSave = () => {
  if (store.auth.uid) {
    return saveUserInfo(store.auth.uid, accountInfo.value)
  }
  router.push({ path: '/login' })
  $q.notify({
    message: t('please_login_first'),
    position: 'top-right',
    color: 'negative'
  })
}

// order_record block
const allOrderRecord = ref({})

// coupons block
const useCoupon = (code) => {
  const couponCodeTemp = useState('couponCodeTemp', () => code)
  router.push({ path: '/cart' })
}
const myCoupons = ref([])

// collection block
const collection = ref([])

// pagination
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const page = ref(1)
watch(page, () => {
  scrollToTop()
})

const totalPage = computed(() => Math.ceil(collection.value.length / 12) || 1)
const showCollection = computed(() => collection.value.slice((page.value - 1) * 12, page.value * 12))

// init
onMounted(async () => {
  if (store.auth.uid) {
    const currAccountInfo = await getSingleData('users', store.auth.uid)
    accountInfo.value = {
      name: currAccountInfo.name || '',
      cellphone: currAccountInfo.cellphone || '',
      email: currAccountInfo.email || '',
      gender: currAccountInfo.gender || '',
      birthday: currAccountInfo.birthday || ''
    }
    myCoupons.value = (await getSingleData('coupons', 'content')).list || []
    allOrderRecord.value = (await getSingleData('order_record', store.auth.uid)) || {}
    collection.value = (await getSingleData('collection', store.auth.uid)).list || []
    collection.value.forEach((item) => {
      item.isCollection = true
    })
  }
})
</script>

<template>
  <QPage>
    <QTabs v-model="tab" inline-label active-color="primary" align="justify">
      <QTab name="account" icon="fa-regular fa-user" :label="$t('account_info')" />
      <QTab name="order_record" icon="fa-solid fa-clipboard" :label="$t('order_record')" />
      <QTab name="coupons" icon="fa-solid fa-ticket" :label="$t('coupons')" />
      <QTab name="collection" icon="fa-solid fa-book-bookmark" :label="$t('collection')" />
    </QTabs>

    <QTabPanels v-model="tab" animated class="bg-accent">
      <QTabPanel name="account">
        <QForm ref="form" class="flex justify-center bg-accent q-pa-md" @submit="onSave()">
          <div>
            <template v-for="(key, index) in Object.keys(accountInfo)" :key="index">
              <QInput
                  v-if="key === 'birthday'"
                  v-model="accountInfo[key]"
                  outlined
                  rounded
                  dense
                  width="300px"
                  mask="date"
                  :label="$t(key)"
                  :rules="[required, rules[key]]"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="accountInfo[key]">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </QInput>
              <QInput
                  v-else-if="key === 'email'"
                  v-model="accountInfo[key]"
                  outlined
                  rounded
                  dense
                  disable
                  width="300px"
                  :label="$t(key)"
                  :rules="[required, rules[key]]"
              />
              <QSelect
                  v-else-if="key === 'gender'"
                  v-model="accountInfo[key]"
                  outlined
                  rounded
                  dense
                  :label="$t('gender')"
                  :options="genderSelectOption"
                  :rules="[required]"
              />
              <Base-input
                  v-else
                  v-model="accountInfo[key]"
                  width="300px"
                  :label="$t(key)"
                  :rules="[required, rules[key]]"
              />
            </template>
            <QBtn class="full-width" color="primary" type="submit" :label="$t('save')" />
          </div>
        </QForm>
      </QTabPanel>
      <QTabPanel name="order_record">
        <QCard v-for="(singleOrder, singleOrderIndex) in allOrderRecord" :key="singleOrderIndex" class="q-mb-md">
          <QCardSection class="row">
            <div class="col-12">
              <p>{{ `${$t('number')} : ${singleOrder.id}` }} <span class="q-ml-lg">{{ `${$t('purchase_date')} : ${singleOrder.create_date}` }}</span></p>
            </div>
            <div class="col-4 q-pa-md">
              <QImg :src="singleOrder.orderList[0].image" alt="product-image" fit="contain" height="100px" />
            </div>
            <div class="col-8 flex justify-around items-center">
              <QIcon v-if="singleOrder.how_to_pay.pay_type === '貨到付款'" color="warning" name="fa-solid fa-circle-exclamation">
                <span class="q-ml-xs">{{ $t('unpaid') }}</span>
              </QIcon>

              <p v-else>{{ $t('paid') }}</p>
              <QIcon color="warning" name="fa-solid fa-circle-exclamation"><span class="q-ml-xs">未出貨</span></QIcon>
              <p>{{ `${$t('total_price')} : $NT ${singleOrder.total_price}` }}</p>
            </div>
          </QCardSection>
        </QCard>
      </QTabPanel>
      <QTabPanel name="coupons">
        <div class="row q-mt-lg">
          <div v-for="(item, index) in myCoupons" :key="index" class="col-12 col-sm-6 q-pa-xs">
            <QCard class="coupon-card overflow-hidden full-height">
              <QCardSection class="q-pa-none full-height">
                <div class="row full-height">
                  <div class="col-3 flex flex-center bg-primary">
                    <QIcon class="coupon-icon" name="fa-solid fa-ticket" color="accent" size="md" />
                  </div>
                  <div class="col-6 q-pa-xs text-dark introduce-block">
                    <p class="text-center text-weight-medium text-size-4">{{ item.title }}</p>
                    <p>{{ `${$t('instructions_for_use')} : ${item.introduce}` }}</p>
                  </div>
                  <div class="col-3 bg-primary">
                    <QBtn flat class="fit" text-color="accent" :label="$t('use')" @click="useCoupon(item.code)" />
                  </div>
                </div>
              </QCardSection>
            </QCard>
          </div>
        </div>
      </QTabPanel>
      <QTabPanel name="collection">
        <div class="row q-pa-md">
          <div v-for="(item, index) in showCollection" :key="index" class="col-6 col-sm-3 q-pa-sm">
            <Base-card :product-info="item" />
          </div>
        </div>
        <QPagination
            v-if="collection.length"
            v-model="page"
            direction-links
            boundary-links
            class="q-my-lg justify-center"
            gutter="10px"
            color="grey"
            active-color="primary"
            :max="totalPage"
            :max-pages="store.screenWidth <= 600 ? 3 : 10"
        />
      </QTabPanel>
    </QTabPanels>
  </QPage>
</template>

<style scoped lang="scss">
.coupon-card {
  border-radius: 10px;

  .coupon-icon {
    transform: rotate(165deg);
  }

  .introduce-block {
    word-break: break-word;
  }
}
</style>
