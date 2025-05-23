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
      d="M12.52 8H9.5C8.67157 8 8 8.67157 8 9.5V12.55C8 13.3784 8.67157 14.05 9.5 14.05H12.52C13.3484 14.05 14.02 13.3784 14.02 12.55V9.5C14.02 8.67157 13.3484 8 12.52 8Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M12.52 18.01H9.5C8.67157 18.01 8 18.6816 8 19.51V22.56C8 23.3884 8.67157 24.06 9.5 24.06H12.52C13.3484 24.06 14.02 23.3884 14.02 22.56V19.51C14.02 18.6816 13.3484 18.01 12.52 18.01Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M22.52 8H19.5C18.6716 8 18 8.67157 18 9.5V22.5C18 23.3284 18.6716 24 19.5 24H22.52C23.3484 24 24.02 23.3284 24.02 22.5V9.5C24.02 8.67157 23.3484 8 22.52 8Z"/>
  </svg>
</template>

<style lang="scss">

</style>


