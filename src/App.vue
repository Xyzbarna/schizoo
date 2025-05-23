<script setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTitle } from '@vueuse/core'
  
  
  // Pinia stores
  import { useStAuth } from '@/stores/stAuth'
  import { useStWindow } from '@/stores/stWindow'
  import { useStWallets } from '@/stores/stWallets'
  
  // Components
  import HeaderMain from '@/components/HeaderMain.vue'
  import BurgerMenu from '@/components/BurgerMenu.vue'
  import FooterMain from '@/components/FooterMain.vue'

  const router = useRouter()
  const route = useRoute()
  
  // Instance stores
  const stAuth = useStAuth()
  const stWindow = useStWindow()
  const stWallets = useStWallets()



  const globalWrapper = ref(null)

  useTitle(`SCHiZOo APP`)

  const globalWidth = computed(() => {
    // viewport min width is 336px, 21rem, 7 blocks
    if (stWindow.viewport.width <= 336) return '100%'
    if (stWindow.viewport.width === 0) return '100%'
    if (!stWindow.viewport?.width ) return '100%'
    // blocks are areas 3x3rem
    return `${stWindow.viewport.blockUnits * 3}rem`
  })

  // Watch reactiu al canvi de l'uid
  watch(() => stAuth.profile.uid, (uid) => {
    if (uid) {
      stWallets.init()
    } else {
      // stWallets.snapshotWallets()
      stWallets.unsubscribeSnapshotWallets()
    }
  }, { immediate: true })

  onMounted( async () => {
    stWindow.setViewport()
    stWindow.setScroll()
    window.addEventListener('resize', stWindow.setViewport)
    window.addEventListener('scroll', stWindow.setScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', stWindow.setViewport)
    window.removeEventListener('scroll', stWindow.setScroll)
  })
</script>

<template>
  <div id="sd-universe">
    <div class="sd-global-size-snapper"
      ref="globalWrapper">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
  #sd-universe {
    min-height: 100svh;
  }

  .sd-global-size-snapper {
    width: v-bind(globalWidth);
    max-width: 63rem;
    margin: 0 auto;
  }
</style>