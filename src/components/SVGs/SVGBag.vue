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

  const svgClssArr = computed(() => {
    return {
      [`sd-svg--direction-${props.direction}`]: props.direction !== 'right'
    }
  })

  const bgClssArr = computed(() => {
    return props.cssBg.map(item => `sd-svg__bg--${item}`)
  })

  const fillClssArr = computed(() => {
    return props.cssFill.map(item => `sd-svg__fill--${item}`)
  })

  const strokeClssArr = computed(() => {
    return props.cssStroke.map(item => `sd-svg__stroke--${item}`)
  })
</script>

<template>
  <svg class="sd-svg"
    :class="svgClssArr"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg">
    <path class="sd-svg__bg"
      :class="bgClssArr"
      d="M16.0002 32.0004C24.8369 32.0004 32.0004 24.8369 32.0004 16.0002C32.0004 7.16354 24.8369 0 16.0002 0C7.16354 0 0 7.16354 0 16.0002C0 24.8369 7.16354 32.0004 16.0002 32.0004Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M23.0005 11.0006H9.00072L8.00073 25.0005H24.0005L23.0005 11.0006Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M13.0005 8.00089C13.0005 6.3449 14.3445 4.99992 16.0004 4.99992C17.6564 4.99992 19.0014 6.3449 19.0014 8.00089"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M12.9998 8.00089V11.0009"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M19.0007 8.00089L19.0017 11.0009"/>
  </svg>
</template>

<style lang="scss">

</style>


