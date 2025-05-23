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

  const svgCssClss = computed(() => {
    return {
      [`sd-svg--direction-${props.direction}`]: props.direction !== 'right'
    }
  })

  const cssBgClssArr = computed(() => {
    return props.cssBg.map(item => `sd-svg__bg--${item}`)
  })

  const cssFillClssArr = computed(() => {
    return props.cssFill.map(item => `sd-svg__fill--${item}`)
  })

  const cssStrokeClssArr = computed(() => {
    return props.cssStroke.map(item => `sd-svg__stroke--${item}`)
  })
</script>

<template>
  <svg class="sd-svg"
    :class="svgCssClss"
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg">
    <path class="sd-svg__bg"
      :class="cssBgClssArr"
      d="M16 5.08584e-07C7.16345 -2.63932e-07 4.07863e-06 7.16344 3.30611e-06 16C2.5336e-06 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 1.2811e-06 16 5.08584e-07Z"/>

    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M15.9956 21.0017C20.4139 21.0017 23.9956 17.42 23.9956 13.0017C23.9956 8.58343 20.4139 5.00171 15.9956 5.00171C11.5773 5.00171 7.99561 8.58343 7.99561 13.0017C7.99561 17.42 11.5773 21.0017 15.9956 21.0017Z"/>

    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M11.0056 19.9473L8.00562 24.0013L11.0156 25.0013L12.0156 28.0013L16.0056 21.0013L20.0156 28.0013L21.0156 25.0013L24.0056 24.0013L21.0056 19.9473"/>
      
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M13.0054 13.002L14.9957 16.0023L19.0053 11.0023"/>
  </svg>
</template>

<style lang="scss">

</style>