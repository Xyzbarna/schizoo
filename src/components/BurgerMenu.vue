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
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import TextBlock from '@/components/TextBlock.vue'
  import SVGCircleBurger from '@/components/SVGs/SVGCircleBurger.vue'
  import SVGCircleCross from '@/components/SVGs/SVGCircleCross.vue'
  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import SVGChat from '@/components/SVGs/SVGChat.vue'


  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'

  const stWindow = useStWindow()
  const stAuth = useStAuth()

  const router = useRouter()

  const menuIsVisible = ref(false)

  const toggleMenu = () => {
    stWindow.menuMain.isOpen = !stWindow.menuMain.isOpen
  }

  const burgerPosRight = computed(() => {
    // 1008px is the max width for the menu
    // 336px is the min width for the menu
    // blocks are 48px squares
    const vpw = stWindow.viewport.width
    const blocks = stWindow.viewport.blockUnits

    if (vpw <= 336) return '0'

    if (vpw >= 1008) {
      const fixedMenuRightValue = (vpw - 1008) / 2
      return `${fixedMenuRightValue}px`
    }

    const rightValue = (vpw - (blocks * 48)) / 2
    return `${rightValue}px`
  })

  const navMenuWidth = computed(() => {
    const vpw = stWindow.viewport.width
    const blocks = stWindow.viewport.blockUnits

    const widthInPixels = blocks * 48
    
    if (vpw <= 336) return `${vpw}px`

    if (vpw >= 1008) return `1008px`

    return `${widthInPixels}px`

  })

  const buttonDisabled = (routeName) => {
    return router.currentRoute.value.name === routeName
  }

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false

    router.push({ name: routeName })
  }
</script>

<template>
  <nav class="sd-nav-menu"
    :class="{ 'sd-nav-menu--expanded': stWindow.menuMain.isOpen }">
    <div class="sd-nav-menu__burger">
      <ButtonIcon 
        :bttnAction="toggleMenu" 
        :bttnColor="'none'">
        <template #bttIconSlot>
          <SVGCircleBurger v-if="!stWindow.menuMain.isOpen" />
          <SVGCircleCross v-else />
        </template>
      </ButtonIcon>
    </div>

    <div class="sd-nav-menu__cont"
      :class="{ 'sd-nav-menu__cont--hidden': !stWindow.menuMain.isOpen }"
      @click="stWindow.menuMain.isOpen = false">
      <ButtonComp v-if="stWindow.menuMain.isOpen" 
        :bttnTxt="'home'"
        :bttnType="'link-r'"
        :bttnColor="'neutral'"
        :bttnDisabled="buttonDisabled('home')"
        :bttnAction="goToRoute"
        :bttnPayload="['home']"/>

      <ButtonComp v-if="stWindow.menuMain.isOpen" 
        :bttnTxt="'user'"
        :bttnType="'link-r'"
        :bttnColor="'neutral'"
        :bttnDisabled="buttonDisabled('user')"
        :bttnAction="goToRoute"
        :bttnPayload="['user']"/>

      <ButtonComp v-if="stWindow.menuMain.isOpen"
        :bttnTxt="'settings'"
        :bttnType="'link-r'"
        :bttnColor="'neutral'"
        :bttnDisabled="buttonDisabled('settings')"
        :bttnAction="goToRoute"
        :bttnPayload="['settings']"/>

      <ButtonComp v-if="stWindow.menuMain.isOpen"
        :bttnTxt="'legal'"
        :bttnType="'link-r'"
        :bttnColor="'neutral'"
        :bttnDisabled="buttonDisabled('legal')"
        :bttnAction="goToRoute"
        :bttnPayload="['legal']"/>

      <ButtonComp v-if="stWindow.menuMain.isOpen"
        :bttnTxt="'contact'"
        :bttnType="'link-r'"
        :bttnColor="'neutral'"
        :bttnDisabled="buttonDisabled('contact')"
        :bttnAction="goToRoute"
        :bttnPayload="['contact']"/>

      <ButtonComp v-if="stWindow.menuMain.isOpen"
        :bttnTxt="'blog'"
        :bttnType="'link-r'"
        :bttnColor="'neutral'"
        :bttnDisabled="buttonDisabled('blog')"
        :bttnAction="goToRoute"
        :bttnPayload="['blog']"/>
    </div>
  </nav>
</template>

<style lang="scss">
  .sd-nav-menu {
    z-index: 9000;
    position: fixed;
    top: 0;
    right: v-bind(burgerPosRight);
    display: grid;
    grid-template-columns: 1fr 3rem;
    grid-template-areas: 
      '.... burger'
      'menu menu';

    &--expanded {
      overflow: scroll;
      background-color: rgba($color-darkest, 1);
    }

    &__burger {
      grid-area: burger;
    }

    &__cont {
      grid-area: menu;
      display: grid;
      width: v-bind(navMenuWidth);
      padding-bottom: 3rem;
      background-color: rgba($color-darkest, .08);

      &--hidden {
        display: none;
      }

      .sd-button-bg {
        justify-self: end;
        padding-right: 3rem;
      }
    }


  }
</style>