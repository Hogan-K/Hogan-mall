<script setup lang="ts">
defineProps({
  rules: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200px'
  },
  mask: {
    type: String,
    default: ''
  },
  fillMask: {
    type: String,
    default: ''
  }
})

const modelValue = defineModel({ type: String, default: '' })
</script>

<template>
  <QInput v-model="modelValue" dense outlined rounded class="input" :mask="mask" :fill-mask="fillMask" :label="label" :rules="rules" />
</template>

<style scoped lang="scss">
.input {
  width: v-bind(width);
}
</style>
