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
      d="M9.99741 16.0008L10.9974 12.0009L18.9973 4.00098L21.9972 7.00094L13.9974 15.0008L9.99741 16.0008Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M23.9771 10.0004C25.0921 10.0004 25.9971 10.9054 25.9971 12.0203V18.9802C25.9971 20.0952 25.0921 21.0002 23.9771 21.0002H11.9973L5.99741 25.0002V12.0203C5.99741 10.9054 6.90241 10.0004 8.0174 10.0004"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.9955 17.0004H21.9954"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M20.9974 13.0004H21.9974"/>
  </svg>
</template>

<style lang="scss">

</style>


