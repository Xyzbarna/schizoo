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

  import { useRouter, RouterLink } from 'vue-router'

  import { useTitle } from '@vueuse/core'

  import _ from 'lodash'

  // helpers
  import { standarizeWidthFromRef, standarizedHeightFromRef} from '@/assets/helpers.js'

  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: null
    },
    deco: {
      type: Boolean,
      default: true
    }
  })

  const textBlockRef = ref(null)



  const textBlockWidth = computed(() => {
    return standarizeWidthFromRef(textBlockRef.value)
  })

  const textBlockHeight = computed(() => {
    return standarizedHeightFromRef(textBlockRef.value)
  })

</script>

<template>
  <div class="sd-txt-block"
    :class="{ [`sd-txt-block--${type}`]: type !== null }"
    ref="textBlockRef">
    <div class="sd-txt-block__deco sd-txt-block__deco--left"
      :class="{ [`sd-txt-block__deco--${type}`]: type !== null }"
      v-if="deco">
      /*
    </div>

    <div class="sd-txt-block__title"
      :class="{ [`sd-txt-block__title--${type}`]: type !== null }">
      {{ text }}
    </div>
    
    <div class="sd-txt-block__deco sd-txt-block__deco--right"
      :class="{ [`sd-txt-block__deco--${type}`]: type !== null }"
      v-if="deco">
      */
    </div>
  </div>
</template>

<style lang="scss">
  .sd-txt-block {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: v-bind(textBlockWidth);
    height: v-bind(textBlockHeight);
    min-height: 3rem;;


    &--alert {
      font-size: .75rem;
      line-height: .75rem;
      text-transform: uppercase;
      background-color: rgba($color-alert, .1);
    }

    &--error {
      font-size: .75rem;
      line-height: .75rem;
      text-transform: uppercase;
      background-color: rgba($color-warning, .1);
    }

    &--title {
      justify-content: flex-start;
      padding-left: 3rem;
    }

    &--post-title {
      justify-content: flex-start;
      padding-left: 3rem;
      width: 100%;
    }

    &--item-title,
    &--item-title-back {
      justify-content: flex-start;
      padding-left: 3rem;
    }

    &--loading {
      padding: 0 3rem;
      background-color: rgba($color-lightest, .01);
    }

    &__title {
      &--alert {
        color: $color-alert;
      }

      &--item-title {
        color: rgba($color-lightest, .6);
      }

      &--post-title {
        text-transform: uppercase;
        color: rgba($color-lightest, 1);
      }

      &--item-title-back {
        color: rgba($color-lightest, .3);
      }
    }

    &__deco {
      font-weight: 200;
      color: rgba($color-lightest, .3);
      padding: 0 .5rem;

      &--alert {
        color: rgba($color-alert, .5);
      }

      &--error {
        color: rgba($color-warning, .5);
      }
    }
  }
</style>