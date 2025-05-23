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
      d="M24 7.97C24 6.88 23.12 6 22.03 6"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      opacity="0.85" d="M10 6C8.91003 6 8.03003 6.88 8.03003 7.97"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M18 6H14.02"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      opacity="0.85" d="M8.03003 24.03C8.03003 25.12 8.91003 26 10 26"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      opacity="0.85" d="M22.03 26C23.12 26 24 25.12 24 24.03"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M14.03 26H18.01"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M8 12V20"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M24 12V20"/>
  </svg>
</template>

<style lang="scss">

</style>


