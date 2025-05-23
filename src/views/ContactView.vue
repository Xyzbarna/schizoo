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

  import markdownit from 'markdown-it'

  // helpers
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import SectionFormAuth from '@/components/sections/SectionFormAuth.vue'
  import SectionMenuFull from '@/components/sections/SectionMenuFull.vue'
  import TextBlock from '@/components/TextBlock.vue'

  import SVGCircleButton from '@/components/SVGs/SVGCircleButton.vue'
  import SVGCircleCross from '@/components/SVGs/SVGCircleCross.vue'
  import SVGCircleCheck from '@/components/SVGs/SVGCircleCheck.vue'


  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStContact } from '@/stores/stContact'
  import { useStUser } from '@/stores/stUser'

  const router = useRouter()

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stContact = useStContact()
  const stUser = useStUser()
  const stLegal = useStLegal()

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })

  useTitle(`schizoo.com // CONTACT`)

  const bttnTxt = computed(() => {
    switch (stContact.contactFormFields.status) {
      case 'ready':
        return 'send'
        break
      case 'sending':
        return 'sending'
        break
      case 'sent':
        return 'sent'
        break
      case 'error':
        return 'error'
        break
      default:
        return 'send'
    }
  })

  const txtMd = computed(() => {
    return md.render(stLegal.legalTxt)
  })

  const legalBannerTxt = computed(() => {
    if (stLegal.legalAccepted) return `I've read and I accept the terms and conditions`
    return `Please read and the accept terms & conditions`
  })

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false
    router.push({ name: routeName })
  }
</script>

<template>
  <main class="sd-view">
    <header class="sd-header-main">
      <TextBlock :text="'contact'" :type="'title'" />
    </header>

    <section class="sd-section sd-section-contact">
      <form class="sd-form sd-form-contact"
        @submit.prevent>
        <div class="sd-form__block sd-form-contact__name">
          <div class="sd-input-bg sd-input-bg--darkest">
            <input class="sd-input sd-input--name"
              autocomplete="on"
              type="text" 
              placeholder="name"
              v-model="stContact.contactFormFields.name">
          </div>
        </div>

        <div class="sd-form__block sd-form-contact__email">
          <div class="sd-input-bg sd-input-bg--darkest">
            <input class="sd-input sd-input--email"
              autocomplete="on"
              type="email" 
              placeholder="email"
              v-model="stContact.contactFormFields.email">
          </div>
        </div>

        <div class="sd-form__block sd-form-contact__textarea">
          <div class="sd-input-bg sd-input-bg--darkest">
            <textarea class="sd-input sd-input--textarea"
              autocomplete="on"
              type="email" 
              placeholder="message"
              v-model="stContact.contactFormFields.message">
            </textarea>
          </div>
        </div>

        <div class="sd-form__block sd-form__block--contact-buttons">
          <ButtonComp class="sd-form__bttn sd-form__bttn--send"
            :bttnAction="stContact.submitContactForm"
            :bttnType="'action'"
            :bttnDisabled="!stLegal.legalAccepted"
            :bttnColor="'accept'"
            :bttnTxt="bttnTxt" />
          
          <div class="sd-form__legal-txt"
            :class="{'sd-form__legal-txt--acepted': stLegal.legalAccepted }">
            {{ legalBannerTxt }}
          </div>

          <ButtonIcon class="sd-form__bttn sd-form__bttn--icon"
            :bttnAction="() => { stLegal.legalAccepted = !stLegal.legalAccepted }">
            <template #bttIconSlot>
              <SVGCircleCross v-if="!stLegal.legalAccepted"
                :cssFill="['link']" 
                :cssStroke="['alert']"/>
              <SVGCircleCheck v-else
                :cssFill="['link']" 
                :cssStroke="['accept']"/>
            </template>
          </ButtonIcon>

          <ButtonComp class="sd-form__bttn sd-form__bttn--legal"
            :bttnTxt="'terms and conditions'"
            :bttnType="'link'"
            :bttnColor="'neutral'"
            :bttnAction="goToRoute"
            :bttnPayload="['legal']"/>
        </div>

        <div class="sd-form__block sd-form__block--msg"
          v-if="false">
          <TextBlock :text="errorMsg" :type="'error'" />
        </div>
      </form>
    </section>
  </main>
</template>

<style lang="scss">
  .sd-section-contact {
    // 9 blocks, 27rem, 432px
    @media (min-width: 433px) {
      padding: 0 3rem;
    }
  }

  .sd-form-contact {
    &__name {
      max-width: 27rem;
    }

    &__email {
      max-width: 27rem;
    }

    &__textarea {
      max-width: 36rem;
    }
  }
</style>