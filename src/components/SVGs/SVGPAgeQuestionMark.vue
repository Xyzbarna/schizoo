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
      d="M23.9932 7.97466C23.9932 6.88567 23.1146 6.00068 22.0267 6.00068H9.97658C8.87471 6.00068 7.99561 6.88567 7.99561 7.97466V24.0265C7.99561 25.1155 8.87471 26.0005 9.97658 26.0005H22.0267C23.1146 26.0005 23.9932 25.1155 23.9932 24.0265V7.97466Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M12.9934 13.0077C12.9934 11.3485 14.3405 10.0006 16.0005 10.0006C17.6605 10.0006 19.0083 11.3485 19.0083 13.0077C19.0083 14.6677 17.6605 16.0156 16.0005 16.0156"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M16.0015 16.0152V18.0152"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M15.9999 23C16.547 23 16.9905 22.5523 16.9905 22C16.9905 21.4478 16.547 21.0001 15.9999 21.0001C15.4528 21.0001 15.0093 21.4478 15.0093 22C15.0093 22.5523 15.4528 23 15.9999 23Z"/>
  </svg>
</template>

<style lang="scss">

</style>


