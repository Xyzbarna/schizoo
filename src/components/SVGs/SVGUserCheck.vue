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
      d="M16.0012 11.9997C17.6579 11.9997 19.001 10.6567 19.001 8.99999C19.001 7.34328 17.6579 6.00024 16.0012 6.00024C14.3445 6.00024 13.0015 7.34328 13.0015 8.99999C13.0015 10.6567 14.3445 11.9997 16.0012 11.9997Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M21.0004 17.9997V16.9997C21.0004 15.8957 20.1044 14.9998 19.0004 14.9998H13.0005C11.8965 14.9998 11.0005 15.8957 11.0005 16.9997V22.9997"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M19.0005 21.9999L21.0006 23.9999L25.0004 20"/>
  </svg>
</template>

<style lang="scss">

</style>


