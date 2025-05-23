<script setup>
  import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

  import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'

  // Components
  import BttnMain from '@/components/buttons/BttnMain.vue'

  const router = useRouter()
  const route = useRoute()

  const stWindow = useStWindow()
  const stAuth = useStAuth()

  const menuBlockRef = ref(null)
  const menuBlockPos = ref(null)
  const menuIsVisible = ref(false)

  onBeforeRouteUpdate((to, from, next) => {
    console.log('onBeforeRouteUpdate', to)
    menuIsVisible.value = false
    next() // Permet que la ruta continuï
  })

  onMounted(() => {
    menuBlockPos.value = menuBlockRef.value.getBoundingClientRect()


    window.addEventListener('scroll', () => {
      menuBlockPos.value = menuBlockRef.value.getBoundingClientRect()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', () => {
      menuBlockPos.value = menuBlockRef.value.getBoundingClientRect()
    })
  })

  const menuBlockPosIsFixed = computed(() => {
    // let topX = 432
    // if (stWindow.viewport.width >= 432) topX = 480
    // if (stWindow.viewport.width >= 673) topX = 240
    // // if (stWindow.viewport.width >= 528) topX = 528
    // let scrolled = stWindow.viewport.scroll

    // if (!menuBlockPos.value) return false
    // if ((topX - scrolled) > 48) return false

    return true
  })

  const toggleMenu = () => {
    console.log('toggleMenu')
    menuIsVisible.value = !menuIsVisible.value
  }

  const menuBlockMarginRight = computed(() => {
    if (!menuBlockPosIsFixed.value) return 'initial'

    let w = stWindow.viewport.width
    let blocks = stWindow.viewport.blockUnits
    let totalMargin = w - (blocks * 48)

    if (w <= 336) return 'initial'
    if (w < 1008 ) return `${totalMargin / 2}px`

    // 1008px is 21 blocks, the max-width accepted
    return `${(w - 1008) / 2}px`
  })


  const bttnGoToUser = reactive({
    action: { 
      func: () => { 
        router.push({ name: 'user' })
        menuIsVisible.value = false
      }, 
      payload: [] 
    },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo: { txt: 'user', deco: true },
    imago: { txt: '', deco: true }
  })

  const bttnGoToCreateProject = reactive({
    action: { 
      func: () => { 
        router.push({ name: 'project-new' }) 
        menuIsVisible.value = false
      }, 
      payload: [] 
    },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo: { txt: 'create project', deco: true },
    imago: { txt: '', deco: true }
  })

  const bttnLogout = reactive({
    action: { 
      func: () => { 
        stAuth.signOutUser()
        router.replace({ name: 'home' })
        menuIsVisible.value = false
      }, 
      payload: [] 
    },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo: { txt: 'logout', deco: true },
    imago: { txt: '', deco: true }
  })

  const bttnGoToAuth = reactive({
    action: { 
      func: () => { 
        router.push({ name: 'user' })
        menuIsVisible.value = false
      }, 
      payload: [] 
    },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo: { txt: 'auth/register', deco: true },
    imago: { txt: '', deco: true }
  })

  const burgerTxt = computed(() => {
    return menuIsVisible.value ? '-' : '+'
  })

  const bttnBurger = reactive({
    action: { 
      func: toggleMenu, 
      payload: [] 
    },
    bttn: { 
      type: 'button', 
      bgColor: `main`,
      bgAlpha: '0.1',
      color: 'main',
      paperColor: `darkest`
    },
    logo: { txt: 'user', deco: true, hidden: true },
    imago: { txt: burgerTxt, deco: true }
  })
</script>

<template>
  <div class="sd-menu-header-block"
    @click.self="menuIsVisible = false"
    :class="{ 
      'sd-menu-header-block--fixed': menuBlockPosIsFixed,
      'sd-menu-header-block--expanded': menuIsVisible, 
    }"
    ref="menuBlockRef">
    <div class="sd-burger">
      <BttnMain
        :action="bttnBurger.action"
        :bttn="bttnBurger.bttn"
        :logo="bttnBurger.logo"
        :imago="bttnBurger.imago"/>
    </div>

    <ul class="sd-header-menu sd-header-menu--a" v-if="menuIsVisible">
      <BttnMain v-if="stAuth.profile.loggedIn"
        :action="bttnGoToUser.action"
        :bttn="bttnGoToUser.bttn"
        :logo="bttnGoToUser.logo"
        :imago="bttnGoToUser.imago"/>

      <BttnMain v-if="stAuth.profile.loggedIn"
        :action="bttnGoToCreateProject.action"
        :bttn="bttnGoToCreateProject.bttn"
        :logo="bttnGoToCreateProject.logo"
        :imago="bttnGoToCreateProject.imago"/>
      
      <BttnMain v-if="stAuth.profile.loggedIn"
        :action="bttnLogout.action"
        :bttn="bttnLogout.bttn"
        :logo="bttnLogout.logo"
        :imago="bttnLogout.imago"/>

      <BttnMain v-if="!stAuth.profile.loggedIn"
        :action="bttnGoToAuth.action"
        :bttn="bttnGoToAuth.bttn"
        :logo="bttnGoToAuth.logo"
        :imago="bttnGoToAuth.imago"/>
    </ul>
  </div>
</template>

<style lang="scss">
  .sd-menu-header-block {
    grid-area: headerMenu;
    z-index: 9000;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 3rem;
    max-width: 63rem; // 21 blocks
    margin-right: v-bind(menuBlockMarginRight);
    background-color: rgba($color-darkest, 1);

    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-color: rgba($color-main, $alpha: .6);
    // }

    &--fixed {
      position: fixed;
      top: 0;
    }

    &--expanded {
      width: 100%;
      height: 100%;
      padding-bottom: 3rem;
    }
  }

  .sd-header-menu {
    position: relative;
  }
  .sd-burger {
    position: relative;
  }
</style>