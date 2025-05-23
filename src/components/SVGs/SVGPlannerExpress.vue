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
      d="M26.0016 26.0001L25.0016 22.0001L13.0017 10.0001L10.0017 13.0001L22.0017 25.0001L26.0016 26.0001Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M16.0006 26.0001C21.5236 26.0001 26.0008 21.5229 26.0008 15.9999C26.0008 10.4769 21.5236 5.99969 16.0006 5.99969C10.4777 5.99969 6.00043 10.4769 6.00043 15.9999C6.00043 21.5229 10.4777 26.0001 16.0006 26.0001Z"/>
    <path class="sd-svg__stroke"
      :class="cssStrokeClssArr"
      d="M18.4698 21.4697C17.7164 21.8102 16.8805 22.0001 16.0007 22.0001C12.6891 22.0001 10.0006 19.3116 10.0006 16C10.0006 15.1201 10.1904 14.2842 10.5315 13.5309M13.5316 10.5309C14.2849 10.1898 15.1208 9.99994 16.0007 9.99994C19.3123 9.99994 22.0007 12.689 22.0007 16C22.0007 16.8805 21.8109 17.7164 21.4698 18.4697"/>
  </svg>
</template>

<style lang="scss">

</style>


