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
      d="M28.0032 14C28.0032 13.6044 27.8859 13.2178 27.6661 12.8889C27.4464 12.56 27.134 12.3036 26.7685 12.1522C26.4031 12.0009 26.001 11.9613 25.613 12.0384C25.225 12.1156 24.8687 12.3061 24.589 12.5858C24.3093 12.8655 24.1188 13.2219 24.0416 13.6098C23.9644 13.9978 24.004 14.3999 24.1554 14.7654C24.3068 15.1308 24.5631 15.4432 24.892 15.6629C25.2209 15.8827 25.6076 16 26.0032 16"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M24.0032 18C24.0032 18.3956 24.1205 18.7822 24.3402 19.1111C24.56 19.44 24.8724 19.6964 25.2378 19.8478C25.6033 19.9991 26.0054 20.0387 26.3934 19.9616C26.7813 19.8844 27.1377 19.6939 27.4174 19.4142C27.6971 19.1345 27.8876 18.7781 27.9647 18.3902C28.0419 18.0022 28.0023 17.6001 27.8509 17.2346C27.6996 16.8692 27.4432 16.5568 27.1143 16.3371C26.7854 16.1173 26.3987 16 26.0032 16"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M5.00317 12H8.00317"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M5.00317 17H7.00317"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M5 20V12"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M14.0032 17H10.0032"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M14.0032 20V11"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M10.0032 15C10.0032 14.4747 10.1066 13.9546 10.3077 13.4693C10.5087 12.984 10.8033 12.543 11.1747 12.1716C11.5462 11.8001 11.9871 11.5055 12.4724 11.3045C12.9577 11.1035 13.4779 11 14.0032 11"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M10.0032 20V15"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M17.0032 18V13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M21.0032 18V13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M19.0032 21V19"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M21.0032 13C21.0032 11.8954 20.1077 11 19.0032 11C17.8986 11 17.0032 11.8954 17.0032 13"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M17.0032 18C17.0032 19.1046 17.8986 20 19.0032 20C20.1077 20 21.0032 19.1046 21.0032 18"/>
  </svg>
</template>

<style lang="scss">

</style>


