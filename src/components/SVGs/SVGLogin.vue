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
      d="M10.9946 9.99982V7.97384C10.9946 6.88485 11.8841 5.99986 12.972 5.99986H21.0161C22.1145 5.99986 22.9928 6.88485 22.9928 7.97384V24.0257C22.9928 25.1146 22.1145 25.9996 21.0161 25.9996H12.972C11.8841 25.9996 10.9946 25.1146 10.9946 24.0257V21.9997"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M22.999 14.9998C21.3432 14.9998 19.9993 13.6559 19.9993 12.0001C19.9993 10.3443 21.3432 8.99978 22.999 8.99978"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M23.0004 17.9993H19.9704C18.8664 17.9993 17.9705 18.8953 17.9705 19.9993V25.9993"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M8.00049 15.9994H11.0004"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M12.9973 12.9994L15.9973 15.9991L12.9973 18.9989"/>
  </svg>
</template>

<style lang="scss">

</style>


