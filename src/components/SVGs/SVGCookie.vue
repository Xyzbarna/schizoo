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
      d="M28.0002 16.0001C28.0002 22.6236 22.6236 28.0002 16.0001 28.0002C9.37655 28.0002 4 22.6236 4 16.0001C4 9.37655 9.37655 4 16.0001 4C14.3442 4 12.9992 5.34498 12.9992 7.00086C12.9992 8.65337 14.3442 9.99835 16.0001 9.99835C14.3442 9.99835 12.9992 11.3433 12.9992 12.9992C12.9992 14.6551 14.3442 16.0001 16.0001 16.0001C16.0001 17.656 17.3451 19.0009 19.0009 19.0009C20.6568 19.0009 21.9984 17.656 21.9984 16.0001C21.9984 17.656 23.3434 19.0009 24.9993 19.0009C26.6552 19.0009 28.0002 17.656 28.0002 16.0001Z"/>
    
    <circle class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      cx="20" cy="6" r="1"/>
    
    <circle class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      cx="23" cy="11" r="1"/>
    
    <circle class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      cx="28" cy="9" r="1"/>
  </svg>
</template>

<style lang="scss">
</style>


