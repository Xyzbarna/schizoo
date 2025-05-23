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
    action: {
      type: Object,
      default: () => ({ 
        func: () => {}, payload: [] }),
    },
    logo: {
      type: Object,
      default: () => ({ 
        txt: '', 
        deco: true,
        hidden: false }),
    },
    imago: {
      type: Object,
      default: () => ({ 
        txt: '', 
        deco: true,
        hidden: false }),
    },
    bttn: {
      type: Object,
      default: () => ({
        type: 'button',
        // 'disabled', 'enabled', 'loading'
        status: 'disabled',
        // 'disabled', 'enabled', 'loading', 'checked', 'unchecked'
        iconStatus: 'disabled', 
        disabled: false,
        color: 'main',
        colAlpha: 0,
        bgColor: 'transparent',
        bgAlpha: 0,
        paperColor: 'transparent',
        paperAlpha: 0,
      }),
    },
  })

  const colRGB = {
    accept: '107,158,109',
    action1st: '109,144,176',
    alert: '214,90,80',
    darkest: '22,22,29',
    main: '165,120,101',
    mainAlt: '230,138,78',
    paper: '255,255,255',
    sch: '128,208,128',
    $colorEa: '0,166,80',
    $colorEb: '78,184,72',
    $colorEc: '190,215,48',
    $colorEd: '255,242,0',
    $colorEe: '253,184,18',
    $colorEf: '243,111,33',
    $colorEg: '237,28,36',
  }

  const buttonRef = ref(null)

  const genColor = (col = 'darkest', alpha = 0.7) => {
    return `rgba(${colRGB[col]}, ${alpha})`
  }

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

  const bgColor = computed(() => {
    let col = props.bttn.bgColor
    let alpha = props.bttn.bgAlpha
    
    return genColor(col, alpha)
  })

  const paperColor = computed(() => {
    let col = props.bttn.paperColor
    let alpha = props.bttn.paperAlpha

    return genColor(col, alpha)
  })

  const txtColor = computed(() => {
    let col = props.bttn.color
    let alpha = props.bttn.colAlpha

    return genColor(col, alpha)
  })

  const deco = computed(() => {
    if (props.bttn.type === 'button') return ['[', ']']
    if (props.bttn.type === 'link') return ['<', '>']

    return ['[', ']']
  })
</script>

<template>
  <button class="sd-button"
    ref="buttonRef"
    :class="{ 
      [`sd-button--${bttn.type}`]: !bttn.disabled,
      [`sd-button--disabled`]: bttn.disabled,
    }"
    :disabled="bttn.disabled"
    @click="action.func(...action.payload)">
    <span class="sd-button__cont">
      <span class="sd-button__logo"
        :class="{ 'sd-button__logo--alone': !imago.txt }"
        v-if="!logo.hidden">
        <span class="sd-button__logo-deco sd-button__logo-deco--left"
          v-if="!imago.txt && logo.deco">
          {{ deco[0] }}
        </span>

        <span class="sd-button__logo-txt">
          {{ logo.txt }}
        </span>

        <span class="sd-button__logo-deco sd-button__logo-deco--right"
          v-if="!imago.txt && logo.deco">
          {{ deco[1] }}
        </span>
      </span>

      <span class="sd-button__imago"
        v-if="imago.txt">
        <span class="sd-button__imago-deco sd-button__imago-deco--left"
          v-if="imago.deco">
          {{ deco[0] }}
        </span>

        <span class="sd-button__imago-txt">
          {{ imago.txt }}
        </span>

        <span class="sd-button__imago-deco sd-button__imago-deco--right"
          v-if="imago.deco">
          {{ deco[1] }}
        </span>
      </span>
    </span>
  </button>
</template>

<style lang="scss">
  .sd-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: v-bind(buttonWidth);
    min-height: 3rem;;
    background-color: v-bind(bgColor);
    border: none;
    cursor: pointer;
    transition: all .125s ease-in-out;

    &__cont {
      align-self: stretch;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0 .5rem;
      background-color: v-bind(paperColor);
    }

    &__logo {
      padding-right: .5rem;
      &--alone {
        padding-right: 0;
      }
    }

    &__logo-deco {
      &--left {
        padding-right: .5rem;
      }

      &--right {
        padding-left: .5rem;
      }
    }

    &__logo-txt {
      color: v-bind(txtColor);
    }

    &__imago-txt {
      color: v-bind(txtColor);
    }
  }
</style>