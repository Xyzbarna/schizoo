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
      d="M11.0017 19.0003C12.6586 19.0003 14.0018 17.6571 14.0018 16.0002C14.0018 14.3432 12.6586 13 11.0017 13C9.34473 13 8.00153 14.3432 8.00153 16.0002C8.00153 17.6571 9.34473 19.0003 11.0017 19.0003Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M21.0002 19.0003C22.6571 19.0003 24.0004 17.6571 24.0004 16.0002C24.0004 14.3432 22.6571 13 21.0002 13C19.3433 13 18.0001 14.3432 18.0001 16.0002C18.0001 17.6571 19.3433 19.0003 21.0002 19.0003Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M11.5013 13.0002H20.5013"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M11.5013 19.0002H20.5013"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      fill-rule="evenodd" clip-rule="evenodd" d="M13.0005 28.0004C11.3445 28.0004 10.0003 26.6562 10.0003 25.0002C10.0003 23.3443 11.3445 22.0001 13.0005 22.0001H18.9999C20.6558 22.0001 22 23.3443 22 25.0002C22 26.6562 20.6558 28.0004 18.9999 28.0004H13.0005Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M10.0019 25.0002L22.0019 25.0002"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M14.0018 22.0002V28.0002"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M18.0003 22.0002V28.0002"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M15.9998 4.00018C16.5521 4.00018 16.9998 3.55247 16.9998 3.00018C16.9998 2.4479 16.5521 2.00018 15.9998 2.00018C15.4475 2.00018 14.9998 2.4479 14.9998 3.00018C14.9998 3.55247 15.4475 4.00018 15.9998 4.00018Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M23.0019 17.0002C23.5542 17.0002 24.0019 16.5525 24.0019 16.0002C24.0019 15.448 23.5542 15.0002 23.0019 15.0002C22.4496 15.0002 22.0019 15.448 22.0019 16.0002C22.0019 16.5525 22.4496 17.0002 23.0019 17.0002Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M13.001 17.0002C13.5533 17.0002 14.001 16.5525 14.001 16.0002C14.001 15.448 13.5533 15.0002 13.001 15.0002C12.4488 15.0002 12.001 15.448 12.001 16.0002C12.001 16.5525 12.4488 17.0002 13.001 17.0002Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M15.9999 8.00018V3.00018"/>
  </svg>
</template>

<style lang="scss">

</style>


