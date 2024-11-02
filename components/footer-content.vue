<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const localLang = ref<string>(locale.value)
const langList = locales.value.map(item => item.code)

const footerLinkBtn = [
  { title: 'about_us' },
  { title: 'member_area', to: '/member-area?type=account' },
  { title: 'contact_us', to: '/contact-us' }
]

const socialAppBtnList = [
  { icon: 'fa-brands fa-facebook' },
  { icon: 'fa-brands fa-line' },
  { icon: 'fa-brands fa-instagram' }
]
</script>

<template>
  <div class="text-accent">
    <h5 class="slogan text-center q-mb-md">Fashion Enhances you</h5>
    <div class="q-my-xl  text-center">
      <QBtn
          v-for="(item, index) in footerLinkBtn"
          :key="index"
          flat
          :class="{ 'footer-btn' : index !== footerLinkBtn.length - 1 }"
          :label="$t(item.title)"
          :to="item.to"
      />
    </div>

    <div class="flex justify-end q-pa-md">
      <QBtn
          v-for="(item, index) in socialAppBtnList"
          :key="index"
          round
          class="q-mr-sm"
          color="accent"
          text-color="primary"
          :icon="item.icon"
      />
      <QSelect
          v-model="localLang"
          dense
          rounded
          outlined
          standout
          bg-color="accent"
          :options="langList"
          @update:model-value="setLocale(localLang)"
      />
    </div>

    <QSeparator color="accent" />

    <p class="text-center q-mt-sm">Copyright © Hogan-mall All Rights Reserved.</p>
  </div>
</template>

<style scoped lang="scss">
.slogan {
  position: relative;

  &:after {
    position: absolute;
    bottom: -20px;
    left: 50%;
    border-radius: 50px;
    transform: translateX(-50%);
    content: '';
    width: 50%;
    height: 3px;
    background: var(--q-accent);
  }
}

.footer-btn {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    right: 0;
    height: 30px;
    border-right: 1px solid var(--q-accent);
  }
}
</style>
