<script setup>
  import { 
    computed,
    nextTick,
    onBeforeMount, 
    onBeforeUpdate,
    onBeforeUnmount, 
    onMounted,
    onUpdated,
    onUnmounted,
    ref, 
    reactive, 
    watch
  } from 'vue'

  import _ from 'lodash'

  const props = defineProps({
    size: {
      type: Number,
      default: 2
    },
    direction: {
      type: String,
      default: 'right'
    },
    cssBg: {
      type: Array,
      default: []
    },
    cssFill: {
      type: Array,
      default: []
    },
    cssStroke: {
      type: Array,
      default: []
    }
  })

  const svgClssArr = computed(() => {
    return {
      [`sd-svg--direction-${props.direction}`]: props.direction !== 'right'
    }
  })

  const bgClssArr = computed(() => {
    return props.cssBg.map(item => `sd-svg__bg--${item}`)
  })

  const fillClssArr = computed(() => {
    return props.cssFill.map(item => `sd-svg__fill--${item}`)
  })

  const strokeClssArr = computed(() => {
    return props.cssStroke.map(item => `sd-svg__stroke--${item}`)
  })
</script>

<template>
  <svg class="sd-svg"
    :class="svgClssArr"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg">
    <path class="sd-svg__bg"
      :class="bgClssArr"
      d="M16.0002 32.0004C24.8369 32.0004 32.0004 24.8369 32.0004 16.0002C32.0004 7.16354 24.8369 0 16.0002 0C7.16354 0 0 7.16354 0 16.0002C0 24.8369 7.16354 32.0004 16.0002 32.0004Z"/>
    <path  class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M9.99756 16.0008L10.9975 12.0009L18.9974 4.00098L21.9974 7.00094L13.9975 15.0008L9.99756 16.0008Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M23.9773 10.0002C25.0923 10.0002 25.9973 10.9052 25.9973 12.0202V18.9801C25.9973 20.0951 25.0923 21.0001 23.9773 21.0001H11.9975L5.99756 25V12.0202C5.99756 10.9052 6.90257 10.0002 8.01755 10.0002"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M16.9954 17.0002H21.9953"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M20.9976 13.0002H21.9975"/>
  </svg>
</template>

<style lang="scss">

</style>


