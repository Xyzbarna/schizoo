import { computed, createApp, reactive, ref, watch } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { pixelsToBlockUnits } from '@/assets/helpers.js'

export const useStWindow = defineStore('stWindow', () => {
  const viewport = reactive({
    width: 0,
    height: 0,
    scroll: 0,
    blockUnits: 0
  })

  const menuMain = reactive({
    isOpen: false,
  })

  const setViewport = () => {
    viewport.width = window.innerWidth
    viewport.height = window.innerHeight
    viewport.blockUnits = pixelsToBlockUnits(window.innerWidth, 48) - 1
  }

  const isScrolling = ref(false)

  const setScroll = () => {
    viewport.scroll = window.scrollY
  }

  return {
    viewport,
    setScroll,
    setViewport,
    menuMain
  }
})
