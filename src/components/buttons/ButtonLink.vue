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
      required: true
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

    return ['[-', '-]']
  })


</script>

<template>
  <div class="sd-button-bg">
    <button class="sd-button"
      ref="buttonRef"
      :class="{ 
        [`sd-button--${bttnType}`]: !bttnDisabled, 
        [`sd-button--disabled`]: bttnDisabled
      }"

      :disabled="bttnDisabled"
      @click="bttnAction(...bttnPayload)">
      <span class="sd-button__deco sd-button__deco--left"
        :class="{ 
          [`sd-button__deco--${bttnType}`]: !bttnDisabled, 
          [`sd-button__deco--disabled`]: bttnDisabled
        }">
        {{ bttnDeco[0] }}
      </span>

      <span class="sd-button__txt"
        :class="{ 
          [`sd-button__txt--${bttnType}`]: !bttnDisabled, 
          [`sd-button__txt--disabled`]: bttnDisabled
        }">
        {{ bttnTxt }}
      </span>

      <span class="sd-button__deco sd-button__deco--right"
        :class="{ 
          [`sd-button__deco--${bttnType}`]: !bttnDisabled, 
          [`sd-button__deco--disabled`]: bttnDisabled
        }">
        {{ bttnDeco[1]  }}
      </span>
    </button>

    <div class="sd-button-icon"
      v-if="bttnIcon">
      <slot name="bttIconSlot"></slot>
    </div>
  </div>
</template>

<style lang="scss">
// check buttonCom.vue for the rest of the styles
</style>