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
      d="M9.99976 15V27H21.9998V15"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M24 13C24 14.1 23.1 15 22 15C20.9 15 20 14.1 20 13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M20 13C20 14.1 19.1 15 18 15C16.9 15 16 14.1 16 13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M16 13C16 14.1 15.1 15 14 15C12.9 15 12 14.1 12 13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M12.0002 13C12.0002 14.1 11.1002 15 10.0002 15C8.90024 15 8.00024 14.1 8.00024 13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M24.0002 13V10H8.00024V13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M24.0002 10L21.0002 7H11.0002L8.00024 10"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M17.97 20H14V27H17.97V20Z"/>
  </svg>
</template>

<style lang="scss">

</style>


