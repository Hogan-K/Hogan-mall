<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const store = useStore()
const { t } = useI18n()

const step = ref(1)
const showPreviousBtn = computed(() => {
  return step.value !== 1
})
const stepperNavigationNextLabel = computed(() => {
  const status = {
    1: '下一步',
    2: '下一步',
    3: '立即結帳',
    4: '繼續購物'
  }
  return status[step.value]
})
const stepperNavigationPreviousLabel = computed(() => {
  return step.value === 4 ? '查看訂單': '上一步'
})

// step1 block
const tableHeader = ref([
  { name: 'image', field: 'image', required: true, label: '', align: 'center', sortable: false },
  { name: 'name', field: 'name', required: true, label: t('product_name'), align: 'center', sortable: false },
  { name: 'size', field: 'size', required: true, label: t('size'), align: 'center', sortable: false },
  { name: 'quantity', field: 'quantity', required: true, label: t('quantity'), align: 'center', sortable: false },
  { name: 'price', field: 'price', required: true, label: t('price'), align: 'center', sortable: false },
  { name: 'delete', field: 'delete', required: true, label: '', align: 'center', sortable: false }
])

// 購物車清單
const tableRow = ref([
  {
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    name: 'top',
    size: 'M',
    quantity: 5,
    price: 2000,
    onSale: 990
  },
  {
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    name: 'bottom',
    size: 'M',
    quantity: 5,
    price: 2000
  }
])

// 訂單清單
const orderList = ref([])

const deleteList = (id) => {
  // 刪除訂單清單項目
  const currDeleteIndex = orderList.value.findIndex((item) => {
    return item.name === id
  })

  if (currDeleteIndex !== -1) {
    orderList.value.splice(currDeleteIndex, 1)
  }

  // 刪除購物車清單
}

const couponCode = ref(null)
const findCoupon = () => {
  console.log('Find coupon')
}
const discountValue = ref(0)

const currTotalPrice = computed(() => {
  return orderList.value.reduce((acc, cur) => acc + (cur.onSale ?? cur.price), 0)
})

const totalPrice = computed(() => {
  return currTotalPrice.value - discountValue.value
})

// step2 block
const $q = useQuasar()
const { required, email, cellphone, address, name, creditCardFormat, cvc } = baseInput()

const form = ref(null)

const payInfo = ref({
  contact: {},
  receive: {},
  how_to_pay: { pay_type: t('cash_on_delivery') }
})

const clearCreditCardInfo = () => {
  delete payInfo.value.how_to_pay.credit_card_code
  delete payInfo.value.how_to_pay.credit_card_cvc
}

const onNextBtn = () => {
  if (step.value === 1) {
    if (!orderList.value.length) {
      return $q.notify({
        message: t('please_choose_product'),
        color: 'negative',
        position: 'top-right',
        timeout: 1000
      })
    }
  }

  if (step.value === 2) {
    return form.value.validate().then(success => {
      if (success) {
        step.value++
      } else {
        $q.notify({
          message: t('please_write_info_required'),
          color: 'negative',
          position: 'top-right',
          timeout: 1000
        })
      }
    })
  }

  if (step.value === 3) {
    console.log('串金流')
  }

  if (step.value === 4) {
    return
  }
  step.value++
}
const onPrevious = () => {
  if (step.value !== 4) {
    step.value--
  }
}
</script>

<template>
  <QPage>
    <QStepper ref="stepper" v-model="step" flat animated class="stepper-block bg-accent" header-class="q-py-lg q-px-md">
      <QStep class="q-pa-lg" icon="fa-solid fa-cart-shopping" :name="1" :title="$t('check_cart')" :done="step > 1">
        <QTable
            v-model:selected="orderList"
            hide-bottom
            selection="multiple"
            row-key="name"
            :columns="tableHeader"
            :rows="tableRow"
        >
          <template #body-cell-image="props">
            <QTd :class="`text-${props.col.align}`" style="min-width: 100px;">
              <QImg class="q-pa-lg" :src="props.value" fit="contain" />
            </QTd>
          </template>

          <template #body-cell-price="props">
            <QTd :class="`text-${props.col.align}`">
              <p v-if="props.row.onSale" class="text-negative">{{ `$NT ${props.row.onSale}` }}</p>
              <p v-else>{{ `$NT ${props.value}` }}</p>
            </QTd>
          </template>

          <template #body-cell-delete="props">
            <QTd>
              <QBtn flat color="red" icon="fa-solid fa-trash-can" @click="deleteList(props.key)" />
            </QTd>
          </template>
        </QTable>
        <QSeparator class="q-my-xl" />
        <!-- coupon block -->
        <div class="flex items-center">
          <QIcon name="fa-solid fa-ticket" size="lg" color="primary" />
          <h2 class="text-size-5 q-ml-sm text-dark">{{ $t('coupon_code') }}</h2>
          <Base-input v-model="couponCode" class="q-ml-md" />
          <QBtn class="q-ml-md" label="使用" color="primary" text-color="accent" :disable="!couponCode" @click="findCoupon()" />
        </div>
        <QSeparator class="q-my-xl" />
        <!-- total price block -->
        <div class="flex justify-end">
          <div class="text-size-4 text-dark" style="min-width: 300px">
            <p class="flex justify-between">{{ $t('product_price') }}<span>{{ `$NT ${currTotalPrice}` }}</span></p>
            <p v-if="discountValue" class="flex justify-between q-mt-sm">{{ $t('on_sela') }}<span class="text-negative">{{ `- $NT ${discountValue}` }}</span></p>
            <QSeparator class="q-mt-sm" />
            <p class="flex justify-between q-mt-sm">{{ $t('total_price') }}<span class="text-size-6 text-weight-medium text-primary">{{ `$NT ${totalPrice}` }}</span></p>
          </div>
        </div>
      </QStep>

      <QStep icon="fa-regular fa-credit-card" :name="2" :title="$t('write_how_to_pay')" :done="step > 2">
        <QForm ref="form">
          <div class="column items-center">
            <div class="col">
              <h2 class="text-size-5 text-weight-medium">{{ $t('contact') }}</h2>
              <Base-input v-model="payInfo.contact.name" class="q-mt-sm" width="300px" :label="$t('name')" :rules="[required, name]" />
              <Base-input v-model="payInfo.contact.email" width="300px" :label="$t('email')" :rules="[email]" />
              <Base-input v-model="payInfo.contact.cellphone" width="300px" :label="$t('cellphone')" :rules="[required, cellphone]" />
            </div>
            <div class="col">
              <h2 class="text-size-5 text-weight-medium">{{ $t('receive') }}</h2>
              <Base-input v-model="payInfo.receive.first_name" class="q-mt-sm" width="300px" :label="$t('first_name')" :rules="[required, name]" />
              <Base-input v-model="payInfo.receive.last_name" width="300px" :label="$t('last_name')" :rules="[required, name]" />
              <Base-input v-model="payInfo.receive.address" :label="$t('address')" width="300px" :rules="[required, address]" />
            </div>
            <div class="col">
              <h2 class="text-size-5 text-weight-medium">{{ $t('how_to_pay') }}</h2>
              <QRadio v-model="payInfo.how_to_pay.pay_type" :label="$t('credit_card')" :val="$t('credit_card')" @update:model-value="clearCreditCardInfo()" />
              <QRadio v-model="payInfo.how_to_pay.pay_type" :label="$t('cash_on_delivery')" :val="$t('cash_on_delivery')" @update:model-value="clearCreditCardInfo()" />
            </div>
            <div v-if="payInfo.how_to_pay.pay_type === $t('credit_card')" class="col">
              <Base-input v-model="payInfo.how_to_pay.credit_card_code" mask="####-####-####-####" fill-mask="#" :label="$t('credit_card_code')" :rules="[required, creditCardFormat]" />
              <Base-input v-model="payInfo.how_to_pay.credit_card_cvc" mask="###" fill-mask="###" :label="$t('credit_card_cvc')" :rules="[required, cvc]" />
            </div>
          </div>
        </QForm>
      </QStep>

      <QStep icon="fa-solid fa-clipboard" :name="3" :title="$t('check_order_list')" :done="step > 3">
        <!-- info block -->
        <QCard v-for="(key, keyIndex) in Object.keys(payInfo)" :key="keyIndex" class="q-mt-lg">
          <QCardSection>
            <h2 class="text-size-5 q-ml-sm text-dark text-weight-medium">{{ $t(key) }}</h2>
            <p v-for="(item, index) in Object.keys(payInfo[key])" :key="index" class="text-size-4 text-dark q-pa-sm">
              <span v-if="payInfo[key][item]">{{ `${$t(item)} :  ${payInfo[key][item]}` }}</span>
            </p>
          </QCardSection>
        </QCard>
        <!-- order list, total block -->
        <div class="row q-mt-lg">
          <div class="col-12 col-sm-6 q-mr-auto">
            <QCard class="full-width">
              <QCardSection v-for="(item, index) in orderList" :key="index" class="flex items-center no-wrap">
                <div class="q-mr-md">
                  <QImg class="step3-image" :src="item.image" fit="contain" style="width: 100px;">
                    <QBadge floating color="primary" :label="item.quantity" />
                  </QImg>
                </div>
                <div class="q-mx-auto text-dark full-width" style="word-break: break-word">
                  <p class="text-weight-medium">{{ item.name }}</p>
                  <p>{{ item.size }}</p>
                </div>
                <div class="text-no-wrap" :class="{ 'text-negative' : item.onSale }">{{ `$NT ${item.onSale ?? item.price}` }}</div>
              </QCardSection>
            </QCard>
          </div>
          <div class="col-12 col-sm-5" :class="{ 'q-mt-lg' : store.screenWidth < 600 }">
            <QCard class="full-width">
              <QCardSection class="q-pa-lg text-size-4 text-dark">
                <p class="flex justify-between">{{ $t('product_price') }}<span>{{ `$NT ${currTotalPrice}` }}</span></p>
                <p v-if="discountValue" class="flex justify-between">{{ $t('on_sela') }}<span class="text-negative">{{ `- $NT ${discountValue}` }}</span></p>
                <QSeparator class="q-my-sm" />
                <p class="flex justify-between">{{ $t('total_price') }}<span class="text-primary text-size-5 text-weight-medium">{{ `$NT ${totalPrice}` }}</span></p>
              </QCardSection>
            </QCard>
          </div>
        </div>
      </QStep>

      <QStep class="step4-block" icon="fa-solid fa-bag-shopping" :name="4" :title="$t('order_finish')">
        <div class="title-block bg-primary rounded-borders flex flex-center">
          <h2 class="text-accent text-weight-medium text-size-6">{{ $t('order_finish') }}</h2>
        </div>
        <div class="text-size-4 text-dark text-center q-mt-md">
          <p class="content">{{ $t('order_finish_content') }}</p>
        </div>
      </QStep>
      <template #navigation>
        <QStepperNavigation class="flex flex-center">
          <QBtn
              v-if="showPreviousBtn"
              class="q-mr-md"
              rounded
              :label="stepperNavigationPreviousLabel"
              :to="step === 4 ? '' : ''"
              @click="onPrevious()"
          />
          <QBtn
              color="primary"
              rounded
              :label="stepperNavigationNextLabel"
              :to="step === 4 ? '/products' : ''"
              @click="onNextBtn()"
          />
        </QStepperNavigation>
      </template>
    </QStepper>
  </QPage>
</template>

<style lang="scss">
.stepper-block {
  .q-stepper__header {
    background: var(--q-primary);

    .q-stepper__tab {
      color: var(--q-accent);

      .q-stepper__dot {
        i {
          color: var(--q-primary);
        }
      }
    }
  }

  .step3-image {
    overflow: visible;
    .q-badge {
      padding: 6px 10px;
    }
  }

  .step4-block {
    .title-block {
      height: 100px;
    }
    .content {
      white-space: pre-line;
    }
  }
}
</style>
