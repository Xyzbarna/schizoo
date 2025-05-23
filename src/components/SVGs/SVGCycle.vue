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
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg">
    <path class="sd-svg__bg"
      :class="cssBgClssArr"
      d="M16 5.08584e-07C7.16345 -2.63932e-07 4.07863e-06 7.16344 3.30611e-06 16C2.5336e-06 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 1.2811e-06 16 5.08584e-07Z"/>
      
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.0007 28.0012C9.37751 28.0012 4.00062 22.5369 4.00062 15.8087C4.00062 10.893 6.86926 6.65334 10.9975 4.72453C11.5531 4.46491 12.1317 4.24693 12.7283 4.07548C12.8187 4.04976 12.9091 4.02404 13.0007 4.00077"/>
    
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.0007 4.00006C22.6239 4.00006 28.0008 9.46439 28.0008 16.1926C28.0008 21.1082 25.1321 25.3479 21.0039 27.2767C20.4483 27.5364 19.8698 27.7544 19.2731 27.9258C19.1827 27.9515 19.0923 27.9772 19.0007 28.0005"/>

    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M18.001 2.00049L16.0008 4.00049L18.001 6.00049"/>

    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M13.9998 30.0006L16 28.0006L13.9998 26.0006"/>
  </svg>
</template>