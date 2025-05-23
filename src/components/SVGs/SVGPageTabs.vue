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
      d="M19.97 26H22.02C23.11 26 23.99 25.12 23.99 24.03V22.98C23.99 21.89 23.11 21.01 22.02 21.01H19.97"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M19.97 16H22.02C23.11 16 23.99 15.12 23.99 14.03V12.98C23.99 11.89 23.11 11.01 22.02 11.01H19.97"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M19.97 21H22.02C23.11 21 23.99 20.12 23.99 19.03V17.98C23.99 16.89 23.11 16.01 22.02 16.01H19.97"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M19.97 11H22.02C23.11 11 23.99 10.12 23.99 9.03001V7.98001C23.99 6.89001 23.11 6.01001 22.02 6.01001H19.97"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M19.97 6H9.97C8.88 6 8 6.88 8 7.97V24.03C8 25.12 8.88 26 9.97 26H20"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M20 11V26"/>
  </svg>
</template>

<style lang="scss">

</style>


