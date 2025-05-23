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
      d="M16.9688 21.0006H19.0245C20.1125 21.0006 20.9963 20.1159 20.9963 19.0266V17.9748C20.9963 16.8852 20.1125 16.0005 19.0245 16.0005H16.9688"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.9688 26.0007H19.0245C20.1125 26.0007 20.9963 25.116 20.9963 24.0267V22.9749C20.9963 21.8853 20.1125 21.0006 19.0245 21.0006H16.9688"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.9688 16.0006H19.0245C20.1125 16.0006 20.9963 15.1159 20.9963 14.0266V12.9748C20.9963 11.8852 20.1125 11.0005 19.0245 11.0005H16.9688"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.961 11.0007H8.96891C7.88098 11.0007 6.98877 11.8857 6.98877 12.9747V24.0267C6.98877 25.1157 7.88098 26.0007 8.96891 26.0007H16.9891"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M15.0175 7.00067H23.0096C24.0975 7.00067 24.9897 7.88567 24.9897 8.97467V24.0007"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M17.0004 16.0007V26.0007"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M13.0006 15.9957H11.0022"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M13.0006 19.0488H11.0022"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M11.0007 15.9957V19.0487"/>
  </svg>
</template>

<style lang="scss">

</style>


