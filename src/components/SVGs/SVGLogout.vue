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
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg">
    <path class="sd-svg__bg"
      :class="cssBgClssArr"
      d="M16 5.08584e-07C7.16345 -2.63932e-07 4.07863e-06 7.16344 3.30611e-06 16C2.5336e-06 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 1.2811e-06 16 5.08584e-07Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M20.9907 22.0006V24.0266C20.9907 25.1156 20.1013 26.0006 19.0133 26.0006H10.9691C9.87074 26.0006 8.99239 25.1156 8.99239 24.0266L8.99239 7.97462C8.99239 6.88562 9.87074 6.00062 10.9691 6.00062H19.0133C20.1013 6.00062 20.9907 6.88562 20.9907 7.97462V10.0006"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M9.0011 15.0007C10.6569 15.0007 12.0009 13.6568 12.0009 12.001C12.0009 10.3451 10.6569 9.0006 9.0011 9.0006"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M9.00108 18.0005H12.0311C13.1351 18.0005 14.0311 18.8965 14.0311 20.0005L14.0311 26.0005"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M19.0008 16.0001H16.0008"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M20.9973 13.0002L23.9973 16L20.9973 18.9998"/>
  </svg>

</template>

<style lang="scss">

</style>


