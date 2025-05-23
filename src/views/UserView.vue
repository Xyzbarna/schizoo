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

  import { useTitle } from '@vueuse/core'

  import { generateSlug } from '@/assets/helpers.js'

  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import TextBlock from '../components/TextBlock.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import IconOnly from '@/components/IconOnly.vue'
  import SVGArrowClose from '@/components/SVGs/SVGArrowClose.vue'
  import SVGCircleArrow from '@/components/SVGs/SVGCircleArrow.vue'
  import SVGCircleUser from '@/components/SVGs/SVGCircleUser.vue'
  import SVGLogin from '@/components/SVGs/SVGLogin.vue'
  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import SVGPageList from '@/components/SVGs/SVGPageList.vue'
  import SWB from '@/components/SWB.vue'

  import SectionFormAuth from '@/components/sections/SectionFormAuth.vue'

  import { useRouter } from 'vue-router'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  const router = useRouter()

  // Components
  import TempNav from '@/components/TempNav.vue'

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false

    router.push({ name: routeName })
  }

  useTitle(`SCHiZOo // USER`)

  onMounted(() => {

  })
</script>

<template>
  <main class="sd-view sd-component">
    <header class="sd-view-header">
      // USER LOGGED IN
    </header>

    <section class="sd-section"> 
      <header class="sd-section__header">
        
      </header>

      <div class="sd-section__cont">
        <button @click="stAuth.signInUser">Login</button>
        <button @click="stAuth.registerUser">Register</button>
        <button @click="stAuth.signOutUser">Logout</button>
      </div>
    </section>

    <TempNav />
  </main>
</template>

<style lang="scss">
  .sd-create-proj {
    &__img-thumb {
      width: 6rem;
      height: 6rem;
    }
  }
</style>