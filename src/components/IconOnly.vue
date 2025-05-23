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
    watch,
  } from 'vue'

  import _ from 'lodash'



  const props = defineProps({
    bttnColor: {
      type: String,
      default: '1st-action'
    },
    customBgColor: {
      type: String,
      required: false
    }
  })

  const customBgColor = computed(() => {
    if (props.customBgColor) return props.customBgColor
    return 'transparent'
  })
</script>

<template>
  <div class="sd-icon-only-bg">
    <div class="sd-icon-only"
      :class="[`sd-icon-only--color-${bttnColor}`]">
      <slot name="bttIconSlot"></slot>
    </div>
  </div>
</template>

<style lang="scss">
  .sd-icon-only-bg {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-darkest, .98);
  }

  .sd-icon-only {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;;
    padding: .5rem;
    background-color: transparent;

    &--color-accept {
      background-color: rgba($color-accept, .05);
    }

    &--color-warning {
      background-color: rgba($color-warning, .06);
    }

    &--color-lightest-001 {
      background-color: rgba($color-lightest, .01);
    }
  }
</style>