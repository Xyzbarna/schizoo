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
      d="M23.9929 7.97461C23.9929 6.88563 23.1143 6.00064 22.0264 6.00064H9.97632C8.87446 6.00064 7.99536 6.88563 7.99536 7.97461V24.0263C7.99536 25.1153 8.87446 26.0003 9.97632 26.0003H22.0264C23.1143 26.0003 23.9929 25.1153 23.9929 24.0263V7.97461Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M20.002 10.0006H12.0017V14.0485H20.002V10.0006Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M12.0015 18.0153H16.0014"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M12.0015 22.0004H20.0013"/>
  </svg>
</template>

<style lang="scss">

</style>


