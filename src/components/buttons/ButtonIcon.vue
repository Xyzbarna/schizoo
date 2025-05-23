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
    bttnAction: {
      type: Function,
      required: true
    },
    bttnPayload: {
      type: Array,
      default: []
    },
    bttnDisabled: {
      type: Boolean,
      default: false
    },
    bttnColor: {
      type: String,
      default: '1st-action'
    }
  })


</script>

<template>
  <div class="sd-button-icon-only-bg">
    <button class="sd-button-icon-only"
      :class="{ 
        [`sd-button-icon-only--color-${bttnColor}`]: !bttnDisabled, 
        [`sd-button-icon-only--disabled`]: bttnDisabled
      }"
      :disabled="bttnDisabled"
      @click="bttnAction(...bttnPayload)">
      <slot name="bttIconSlot"></slot>
    </button>
  </div>
</template>

<style lang="scss">
// .sd-button-icon {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 3rem;
//   height: 3rem;
//   padding: .5rem;
//   background-color: rgba($color-lightest, .01);
//   cursor: pointer;
//   transition: all .125s ease-in-out;

//   &--disabled {
//     cursor: not-allowed;
//   }
// }

// .sd-button-icon-only-bg {
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba($color-darkest, .98);

//   &:hover {
//     .sd-button-icon-only {

//       &--color-accept {
//         background-color: rgba($color-accept, .075);
//       }

//       &--color-warning {
//         background-color: rgba($color-warning, .09);
//       }

//       &--color-none {
//         background-color: rgba($color-lightest, .025);
//       }

//       &--color-lightest-001 {
//         background-color: rgba($color-lightest, .075);
//       }
//     }
//   }

//   &:active {
//     .sd-button-icon-only {
//       &--color-accept {
//         background-color: rgba($color-accept, .1);
//       }

//       &--color-warning {
//         background-color: rgba($color-warning, .12);
//       }

//       &--color-none {
//         background-color: rgba($color-lightest, .05);
//       }

//       &--color-lightest-001 {
//         background-color: rgba($color-lightest, .1);
//       }
//     }
//   }
// }

// .sd-button-icon-only {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 3rem;
//   height: 3rem;;
//   padding: .5rem;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   transition: all .125s ease-in-out;

//   &--color-accept {
//     background-color: rgba($color-accept, .05);
//   }

//   &--color-warning {
//     background-color: rgba($color-warning, .06);
//   }

//   &--color-lightest-001 {
//     background-color: rgba($color-lightest, .01);
//   }

//   &--color-none {
//     background-color: transparent;
//   }

//   &--disabled {
//     cursor: not-allowed;
//     .sd-svg__stroke {
//       stroke: rgba($color-lightest, .1);
//     }
//   }
// }
</style>