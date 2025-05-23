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

  import SWB from '@/components/SWB.vue'

  const currentYear = computed(() => {
    let currentDate = new Date()
    return currentDate.getFullYear()
  })
</script>

<template>
  <footer class="sd-footer-main">
    <div class="sd-cont sd-footer-main__cont">
      <SWB class="sd-block sd-footer-main__block sd-footer-main__block--schizoo">
        schiZOo
      </SWB>

      <SWB class="sd-block sd-footer-main__block sd-block sd-footer-main__block--copyright">
        ©
      </SWB>

      <SWB class="sd-block sd-footer-main__block sd-block sd-footer-main__block--year">
        {{ currentYear }}
      </SWB>

      <SWB class="sd-block sd-footer-main__block sd-block sd-footer-main__block--divider">
        //
      </SWB>

      <SWB class="sd-block sd-footer-main__block sd-block sd-footer-main__block--twitter">
        <span>
          :@
        </span>

        <a 
          href="https://twitter.com/schizoo_bcn" 
          target="_blank">
          twitter
        </a>
      </SWB>
    </div>

    <div class="sd-cont sd-footer-main__cont sd-footer-main__cont--filler">

    </div>
  </footer>
</template>

<style lang="scss">
  .sd-footer-main {
    margin-top: 3rem;

    &__cont {
      display: flex;
      flex-wrap: wrap;

      &--filler {
        min-height: calc(100svh - 6rem);
        background-color: rgba($color-darkest, 1);
        flex-grow: 1;

        @media (min-width: 33rem) {
          min-height: calc(100svh - 3rem);
        }
      }
    }

    &__block {
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba($color-lightest, .15);
      padding: .25rem .5rem;

      &--schizoo {
        justify-content: flex-start;
        padding-left: 3rem;
      }

      &--copyright {
        background-color: rgba($color-lightest, .01);
      }

      &--year {
        padding: .25rem 1rem;
        background-color: rgba($color-lightest, .02);

        // 7 blocks (7 * 3)
        @media (min-width: calc(21rem)) {
          margin-right: 3rem;
        }

        // 8 blocks (8 * 3)
        @media (min-width: calc(24rem + 1px)) {
          margin-right: 6rem;
        }

        // 9 blocks (9 * 3)
        @media (min-width: calc(27rem + 1px)) {
          margin-right: 9rem;
        }

        // 10 blocks (10 * 3)
        @media (min-width: calc(30rem + 1px)) {
          margin-right: 12rem;
        }

        // 11 blocks (11) * 3)
        @media (min-width: calc(33rem + 1px)) {
          margin-right: 0rem;
        }
      }

      &--divider {
        color: rgba($color-lightest, .05);
        background-color: rgba($color-lightest, .03);
      }

      &--twitter {
        padding: .25rem 1rem;
        background-color: rgba($color-lightest, .02);

        a {
          color: rgba($color-schizoo, .6);

          &:hover {
            color: rgba($color-schizoo, 1);
          }

          &:active {
            color: rgba($color-lightest, 1);
          }
        }
      }
    }
  }

  .sd-block {
    min-width: 3rem;
    min-height: 3rem;
  }
</style>