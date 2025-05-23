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
    bttnType: {
      type: String,
      default: 'button'
    },
    bttnTxt: {
      type: String,
    },
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
    bttnIcon: {
      type: Boolean,
      default: false
    },
    bttnColor: {
      type: String,
      default: '1st-action'
    }
  })

  const buttonRef = ref(null)

  const buttonWidth = computed(() => {
    let remainder = 0
    let newWidth = 'auto'

    if (buttonRef.value) {
      remainder = buttonRef.value.offsetWidth % 48

      if (remainder) {
        newWidth = `${buttonRef.value.offsetWidth + 48 - remainder}px`
      } else {
        newWidth = `${buttonRef.value.offsetWidth}px`
      }
    }

    return newWidth
  })

  const bttnDeco = computed(() => {
    if (props.bttnType === 'button') return ['[·', '·]']
    if (props.bttnType === 'link') return ['<·', '·>']
    if (props.bttnType === 'link-r') return ['<·', '·>']
    if (props.bttnType === 'action') return ['[·', '·]']

    return ['[-', '-]']
  })
</script>

<template>
  <div class="sd-button-bg">
    <button class="sd-button"
      ref="buttonRef"
      :class="{ 
        [`sd-button--${bttnType}`]: !bttnDisabled, 
        [`sd-button--color-${bttnColor}`]: !bttnDisabled, 
        [`sd-button--disabled`]: bttnDisabled
      }"

      :disabled="bttnDisabled"
      @click="bttnAction(...bttnPayload)">
      <span class="sd-button__deco sd-button__deco--left"
        :class="{ 
          [`sd-button__deco--${bttnType}`]: !bttnDisabled, 
          [`sd-button__deco--color-${bttnColor}`]: !bttnDisabled, 
          [`sd-button__deco--disabled`]: bttnDisabled
        }">
        {{ bttnDeco[0] }}
      </span>

      <span class="sd-button__txt"
        :class="{ 
          [`sd-button__txt--${bttnType}`]: !bttnDisabled,
          [`sd-button__txt--color-${bttnColor}`]: !bttnDisabled,  
          [`sd-button__txt--disabled`]: bttnDisabled
        }">
        {{ bttnTxt }}
      </span>

      <span class="sd-button__deco sd-button__deco--right"
        :class="{ 
          [`sd-button__deco--${bttnType}`]: !bttnDisabled,
          [`sd-button__deco--color-${bttnColor}`]: !bttnDisabled,  
          [`sd-button__deco--disabled`]: bttnDisabled
        }">
        {{ bttnDeco[1]  }}
      </span>
    </button>

    <div class="sd-button-icon"
      v-if="bttnIcon"
      :class="{ 
          [`sd-button-icon--${bttnType}`]: !bttnDisabled,
          [`sd-button-icon--color-${bttnColor}`]: !bttnDisabled,  
          [`sd-button-icon--disabled`]: bttnDisabled
        }">
      <slot name="bttIconSlot"></slot>
    </div>
  </div>
</template>

<style lang="scss">
  // .sd-button-bg {
  //   display: inline-flex;
  //   justify-content: center;
  //   align-items: center;
  //   background-color: rgba($color-darkest, .98);

  //   &:hover {
  //     .sd-button {
  //       &--link {
  //         background-color: rgba($color-lightest, .04);
  //       }

  //       &--color-1st-action {
  //         background-color: rgba($color-1st-action, .12);
  //       }

  //       &--color-neutral {
  //         background-color: rgba($color-lightest, .04);
  //       }

  //       &--color-accept {
  //         background-color: rgba($color-accept, .1);
  //       }

  //       &--color-alert {
  //         background-color: rgba($color-alert, .2);
  //       }

  //       &--color-warning {
  //         background-color: rgba($color-warning, .12);
  //       }

  //       &--disabled {
  //         background-color: rgba($color-lightest, .01);
  //       }
  //     }

  //     .sd-button-icon {
  //       background-color: rgba($color-lightest, .02);

  //       &--disabled {
  //         background-color: rgba($color-lightest, .01);
  //       }
  //     }
  //   }

  //   &:active {
  //     .sd-button {
  //       &--link {
  //         background-color: rgba($color-lightest, .12);
  //       }

  //       &--color-1st-action {
  //         background-color: rgba($color-1st-action, .36);
  //       }

  //       &--color-neutral {
  //         background-color: rgba($color-lightest, .12);
  //       }

  //       &--color-accept {
  //         background-color: rgba($color-accept, .3);
  //       }

  //       &--color-alert {
  //         background-color: rgba($color-alert, .3);
  //       }

  //       &--color-warning {
  //         background-color: rgba($color-warning, .36);
  //       }

  //       &--disabled {
  //         background-color: rgba($color-lightest, .01);
  //       }

  //       &__deco {
  //         color: rgba($color-darkest, 1);

  //         &--disabled {
  //           color: rgba($color-lightest, .15);
  //       }
  //       }
  //     }

  //     .sd-button-icon {
  //       background-color: rgba($color-lightest, .04);

  //       &--disabled {
  //         background-color: rgba($color-lightest, .01);
  //       }
  //     }
  //   }
  // }

  // .sd-button {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   width: v-bind(buttonWidth);
  //   min-height: 3rem;;
  //   padding: .25rem .5rem;
  //   background-color: transparent;
  //   border: none;
  //   cursor: pointer;
  //   transition: all .125s ease-in-out;


  //   &--link {
  //     background-color: rgba($color-lightest, .02);
  //   }

  //   &--link-r {
  //     justify-content: flex-end;
  //     background-color: rgba($color-lightest, .02);
  //   }

  //   &--color-1st-action {
  //     background-color: rgba($color-1st-action, .06);
  //   }

  //   &--color-accept {
  //     background-color: rgba($color-accept, .05);
  //   }

  //   &--color-neutral {
  //     background-color: rgba($color-lightest, .02);
  //   }

  //   &--color-alert {
  //     background-color: rgba($color-alert, .1);
  //   }

  //   &--color-warning {
  //     background-color: rgba($color-warning, .06);
  //   }

  //   &--disabled {
  //     background-color: rgba($color-lightest, .01);
  //     cursor: not-allowed;
  //   }

  //   &__txt {
  //     font-weight: 300;
  //     color:rgba($color-lightest, .5);

  //     &--disabled {
  //       color: rgba($color-lightest, .2);
  //     }
  //   }

  //   &__deco {
  //     font-weight: 600;
  //     color: rgba($color-1st-action, .6);

  //     &--color-accept {
  //       color: rgba($color-accept, .6);
  //     }

  //     &--color-alert {
  //       color: rgba($color-alert, .6);
  //     }

  //     &--color-warning {
  //       color: rgba($color-warning, .6);
  //     }

  //     &--disabled {
  //       color: rgba($color-lightest, .15);
  //     }
  //   }
  // }

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
</style>