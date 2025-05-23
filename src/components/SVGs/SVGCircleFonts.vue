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
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"/>
    <path class="sd-svg__fill"
      :class="cssFillClssArr"
      d="M9.82001 16.54H11.34L10.59 14.19H10.56L9.82001 16.54ZM8.20001 18.27H8.60001L10.34 13.21H11.44L13.18 18.27H13.58V18.8H11.24V18.27H11.88L11.5 17.09H9.68001L9.30001 18.27H9.94001V18.8H8.22001V18.27H8.20001Z"/>
    <path class="sd-svg__fill"
      :class="cssFillClssArr"
      d="M16.59 12.4099H15.58V19.5899H16.59V12.4099Z"/>
    <path class="sd-svg__fill"
      :class="cssFillClssArr"
      d="M21.22 14.31H21.18L20.56 16.43H21.84L21.22 14.31ZM22.54 18.79L22.14 17.46H20.28L19.88 18.79H18.65L20.49 13.21H21.99L23.81 18.79H22.55H22.54Z"/>
  </svg>
</template>

<style lang="scss">

</style>


