<script setup>
  import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'

  // Components
  import HeaderMainMenu from '@/components/HeaderMainMenu.vue'

  const route = useRoute()
  const stAuth = useStAuth()

  const tcBP = {
    mark: {
      open_parenthesis: { str: '(', html5: '&#40;' },
      single_quote: { str: "'", html5: '&#39;' },
      less_than: { str: '<', html5: '&#60;' },
      more_than: { str: '>', html5: '&#62;' },
      close_parenthesis: { str: ')', html5: '&#41;' },
      backslash: { str: '\\', html5: '&#92;' },
      underscore: { str: '_', html5: '&#95;' },
      slash: { str: '/', html5: '&#47;' },
      space: { str: ' ', html5: '&#32;' }
    }
  }

  const nod = ref(true)

  const leftMouth = computed(() => {
    return nod.value ? tcBP.mark.less_than.html5 : tcBP.mark.more_than.html5
  })

  const rightMouth = computed(() => {
    return nod.value ? tcBP.mark.less_than.html5 : tcBP.mark.more_than.html5
  })



  const randTrueFalse = () => Math.random() < 0.5

  const executeRandomly = () => {
    // interval
    const int = Math.floor(Math.random() * 2000)

    setTimeout(() => {
      nod.value = randTrueFalse()
      executeRandomly()
    }, int)
  }


  const nodAction = computed(() => {
    let rightTalks = "'...... hl_lpa hl_eye hl_mou . hr_mou hr_eye hr_rpa ...... ......'"
    let leftTalks = "'...... ...... hl_lpa hl_eye hl_mou . hr_mou hr_eye hr_rpa ......'"

    return nod.value ? leftTalks : rightTalks
  })

  onMounted(() => {
    executeRandomly()
  })
</script>

<template>
  <div class="sd-bg">
    <header class="sd-header-main">
      <div class="sd-header-main__cont">
        <router-link class="sd-tc-mark" to="/">
          <div class="sd-tc-imago">
            <div class="sd-tc-imago__head-left-parenthesis"
              v-html="tcBP.mark.open_parenthesis.html5">
            </div>

            <div class="sd-tc-imago__head-left-eye"
              v-html="tcBP.mark.single_quote.html5">
            </div>

            <div class="sd-tc-imago__head-left-mouth"
              v-html="leftMouth">
            </div>

            <div class="sd-tc-imago__head-right-mouth"
              v-html="rightMouth">
            </div>

            <div class="sd-tc-imago__head-right-eye"
              v-html="tcBP.mark.single_quote.html5">
            </div>

            <div class="sd-tc-imago__head-right-parenthesis"
              v-html="tcBP.mark.close_parenthesis.html5">
            </div>

            <div class="sd-tc-imago__body-left-tail"
              v-html="tcBP.mark.backslash.html5">
            </div>

            <div class="sd-tc-imago__body-left-left-parenthesis"
              v-html="tcBP.mark.open_parenthesis.html5">
            </div>

            <div class="sd-tc-imago__body-left-bottom"
              v-html="tcBP.mark.underscore.html5">
            </div>

            <div class="sd-tc-imago__body-left-right-parenthesis"
              v-html="tcBP.mark.close_parenthesis.html5">
            </div>

            <div class="sd-tc-imago__body-right-left-parenthesis"
              v-html="tcBP.mark.open_parenthesis.html5">
            </div>

            <div class="sd-tc-imago__body-right-bottom"
              v-html="tcBP.mark.underscore.html5">
            </div>

            <div class="sd-tc-imago__body-right-right-parenthesis"
              v-html="tcBP.mark.close_parenthesis.html5">
            </div>

            <div class="sd-tc-imago__body-right-tail"
              v-html="tcBP.mark.slash.html5">
            </div>
          </div>
          
          <div class="sd-tc-logo">
            <div class="sd-tc-logo__troba">
              troba
            </div>

            <div class="sd-tc-logo__dot">
              .
            </div>

            <div class="sd-tc-logo__casa">
              casa
            </div>
          </div>
        </router-link>

        <div class="sd-tc-claim">
          la casa que busques
        </div>
      </div>

      <HeaderMainMenu />
    </header>
  </div>
</template>

<style lang="scss">  
  .sd-bg {
    background-color: rgba($color-darkest, .98);
  }
  .sd-header-main {
    background-color: rgba($color-lightest, .01);
    padding: 3rem;
  }

  .sd-tc-mark {
    display: inline-block;

    &:hover {
      .sd-tc-logo {
        font-weight: 200;
      }

      .sd-tc-imago {
        &__head-left-mouth {
          font-weight: 600;
        }

        &__head-right-mouth {
          font-weight: 600;
        }
      }
    }

    &:active {
      .sd-tc-logo {
        color: rgba($color-alt-main, 1);
      }

      .sd-tc-imago {
        color: rgba($color-lightest, .6);

        &__head-left-mouth {
          font-weight: 600;
          color: rgba($color-alt-main, 1);
        }

        &__head-right-mouth {
          font-weight: 600;
          color: rgba($color-alt-main, 1);
        }
      }
    }
  }

  .sd-tc-imago {
    display: grid;
    grid-template-columns: repeat(10, .5rem);
    grid-template-areas: 
      v-bind(nodAction)
      'bl_tai bl_lpa bl_bot bl_rpa ...... . br_lpa br_bot br_rpa br_tai';
      // hl_lpa:  left head, left parenthesis
      // hl_eye:  left head, eye
      // hl_mou:  left head, mouth
      // hr_mou: right head, mouth
      // hr_eye: right head, eye
      // hr_rpa: right head, right parenthesis
      // bl_tai:  left body, tail
      // bl_lpa:  left body, left parenthesis
      // bl_bot:  left body, bottom
      // bl_rpa:  left body, right parenthesis
      // br_lpa: right body, left parenthesis
      // br_bot: right body, bottom
      // br_rpa: right body, right parenthesis
    font-family: $font-mono;
    font-weight: 200;
    color: rgba($color-lightest, .3);

    &__head-left-parenthesis {
      grid-area: hl_lpa;
    }

    &__head-left-eye {
      grid-area: hl_eye;
    }

    &__head-left-mouth {
      grid-area: hl_mou;
      color: $color-main;
    }

    &__head-right-mouth {
      grid-area: hr_mou;
      color: $color-main;

    }

    &__head-right-eye {
      grid-area: hr_eye;
    }

    &__head-right-parenthesis {
      grid-area: hr_rpa;
    }

    &__body-left-tail {
      grid-area: bl_tai;
    }

    &__body-left-left-parenthesis {
      grid-area: bl_lpa;
    }

    &__body-left-bottom {
      grid-area: bl_bot;
    }

    &__body-left-right-parenthesis {
      grid-area: bl_rpa;
    }

    &__body-right-left-parenthesis {
      grid-area: br_lpa;
    }

    &__body-right-bottom {
      grid-area: br_bot;
    }

    &__body-right-right-parenthesis {
      grid-area: br_rpa;
    }

    &__body-right-tail {
      grid-area: br_tai;
    }
  }

  .sd-tc-logo {
    display: flex;
    font-family: $font-mono;
    font-weight: 600;
    color: rgb($color-main, 1);
    text-transform: uppercase;
  }

  .sd-tc-claim {
    font-family: $font-mono;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1rem;
    color: rgba($color-darkest, .6);
  }
</style>