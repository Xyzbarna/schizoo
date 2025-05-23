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
      d="M24 7.7067C24 6.65272 23.12 5.80179 22.03 5.80179H9.98C8.89 5.80179 8 6.65272 8 7.7067V23.2361C8 24.2901 8.89 25.141 9.98 25.141H22.03C23.12 25.141 24 24.2901 24 23.2361V7.7067Z"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M19 17.4053L20 17.4053"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M12 17.415H16"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M19 21.2732L20 21.2732"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M12 21.2828H16"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M19 9.66962L20 9.66962"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M12 9.67929H16"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M19 13.5375L20 13.5375"/>
    <path class="sd-svg__stroke" 
      :class="cssStrokeClssArr"
      d="M12 13.5471H16"/>
  </svg>
</template>

<style lang="scss">
</style>