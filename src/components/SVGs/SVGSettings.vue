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
      d="M6 10H20"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M24 10H26"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M6 16H8"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M12 16H26"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M22 12C23.1046 12 24 11.1046 24 10C24 8.89543 23.1046 8 22 8C20.8954 8 20 8.89543 20 10C20 11.1046 20.8954 12 22 12Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M10 18C11.1046 18 12 17.1046 12 16C12 14.8954 11.1046 14 10 14C8.89543 14 8 14.8954 8 16C8 17.1046 8.89543 18 10 18Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M6 22H14"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M18 22H26"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16 24C17.1046 24 18 23.1046 18 22C18 20.8954 17.1046 20 16 20C14.8954 20 14 20.8954 14 22C14 23.1046 14.8954 24 16 24Z"/>
  </svg>
</template>

<style lang="scss">

</style>


