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
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M15.9995 28.0004C22.627 28.0004 27.9996 22.6278 27.9996 16.0003C27.9996 9.37282 22.627 4.00018 15.9995 4.00018C9.37208 4.00018 3.99945 9.37282 3.99945 16.0003C3.99945 22.6278 9.37208 28.0004 15.9995 28.0004Z"/>
    <path class="sd-svg__fill"
      :class="fillClssArr"
      d="M15.9995 23.0005C19.8655 23.0005 22.9995 19.8665 22.9995 16.0005C22.9995 12.1345 19.8655 9.00043 15.9995 9.00043C12.1335 9.00043 8.99945 12.1345 8.99945 16.0005C8.99945 19.8665 12.1335 23.0005 15.9995 23.0005Z"/>
  </svg>
</template>

<style lang="scss">

</style>


