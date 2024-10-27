<script setup lang="ts">
const contactData = {
  otherBlock: {
    address: 'nldasnlfas',
    email: 'smkdkmals@gmail.com',
    customer_service: '098765654321'
  },
  socialBlock: [
    { icon: 'fa-brands fa-youtube' },
    { icon: 'fa-brands fa-line' },
    { icon: 'fa-brands fa-facebook' }
  ]
}
</script>

<template>
  <QPage>
    <Base-guide-map />
    <div class="bg-dark flex justify-center items-end q-pb-md" style="height: 200px;">
      <h1 class="text-accent text-size-10 text-weight-medium">與我們聯繫</h1>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-12 col-sm-4 shadow-3 rounded-borders q-pa-md q-mb-xl text-dark bg-accent">
        <h2
            v-for="(key, index) in Object.keys(contactData.otherBlock)"
            :key="index"
            class="text-size-5 text-weight-regular"
            :class="{ 'q-mt-sm' : index !== 0 }"
        >
          {{ `${$t(key)} : ${contactData.otherBlock[key]}` }}
        </h2>
        <div class="flex justify-around q-mt-md">
          <QBtn
              v-for="(item, index) in contactData.socialBlock"
              :key="index"
              round
              color="primary"
              text-color="accent"
              :icon="item.icon"
          />
        </div>
      </div>
    </div>
  </QPage>
</template>
