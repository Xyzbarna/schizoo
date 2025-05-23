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
    <path class="sd-svg__fill"
      :class="fillClssArr"
      d="M10.1602 16.7426L10.0752 16.7654L11.0359 20.3509L10.0468 20.6159L8.60156 15.2222L9.9925 14.8495L12.1819 18.1058L12.2669 18.083L11.3062 14.4975L12.2953 14.2324L13.7405 19.6262L12.3496 19.9989L10.1602 16.7426ZM14.8301 19.3342L13.3848 13.9405L16.8313 13.017L17.0859 13.9675L14.7986 14.5804L15.1299 15.8168L17.3399 15.2246L17.5946 16.1751L15.3846 16.7672L15.7345 18.0732L18.0218 17.4603L18.2765 18.4108L14.8301 19.3342ZM19.2656 18.1457L17.4881 12.841L18.4849 12.5739L19.505 15.7626L19.8246 16.7702L19.8942 16.7515L19.5337 13.5518L20.5769 13.2723L21.8647 16.2235L21.9342 16.2049L21.7155 15.2034L20.9963 11.901L21.9545 11.6443L23.0675 17.127L21.5993 17.5204L20.408 14.651L20.3307 14.6717L20.7338 17.7523L19.2656 18.1457Z"/>
    <path class="sd-svg__stroke"
      :class="strokeClssArr"
      d="M16 4.00049L18.2307 6.22999L21.2074 5.18874L22.2487 8.16551L25.3825 8.51853L25.0294 11.6523L27.7 13.3306L26.0217 16L27.7 18.6705L25.0294 20.3487L25.3825 23.4825L22.2487 23.8355L21.2074 26.8123L18.2307 25.7699L16 28.0006L13.7705 25.7699L10.7938 26.8123L9.75252 23.8355L6.61875 23.4825L6.97177 20.3487L4.30127 18.6705L5.97951 16L4.30127 13.3306L6.97177 11.6523L6.61875 8.51853L9.75252 8.16551L10.7938 5.18874L13.7705 6.22999L16 4.00049Z"/>
  </svg>
</template>

<style lang="scss">

</style>


