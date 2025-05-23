<script setup>
  import { computed, ref } from 'vue'

  // helpers
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  const blockRef = ref(null)

  const blockWidth = computed(() => {
    return standarizeWidthFromRef(blockRef.value)
  })

</script>

<template>
  <div class="sd-block-SW"
    ref="blockRef">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .sd-block-SW {
    width: v-bind(blockWidth);
  }
</style>