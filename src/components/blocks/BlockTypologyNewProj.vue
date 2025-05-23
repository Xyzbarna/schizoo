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

  import BlockAddress from '@/components/blocks/BlockAddress.vue'
  import BlockAmenities from '@/components/blocks/BlockAmenities.vue'
  import BlockCalendar from '@/components/blocks/BlockCalendar.vue'
  import BlockDescriptions from '@/components/blocks/BlockDescriptions.vue'
  import BlockSatus from '@/components/blocks/BlockStatus.vue'
  import BlockFiles from '@/components/blocks/BlockFiles.vue'

  import BlockDescriptionsNewProj from '@/components/blocks/BlockDescriptionsNewProj.vue'
  import BlockAddressNewProj from '@/components/blocks/BlockAddressNewProj.vue'
  import BlockAmenitiesNewProj from '@/components/blocks/BlockAmenitiesNewProj.vue'
  import BlockSatusNewProj from '@/components/blocks/BlockStatusNewProj.vue'
  import BlockCalendarNewProj from '@/components/blocks/BlockCalendarNewProj.vue'
  import BlockMessages from '@/components/blocks/BlockMessages.vue'

  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import IconOnly from '@/components/IconOnly.vue'
  import SVGArrowClose from '@/components/SVGs/SVGArrowClose.vue'
  import SVGCircleArrow from '@/components/SVGs/SVGCircleArrow.vue'
  import SVGCircleUser from '@/components/SVGs/SVGCircleUser.vue'
  import SVGLogin from '@/components/SVGs/SVGLogin.vue'
  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import SVGPageList from '@/components/SVGs/SVGPageList.vue'
  import SWB from '@/components/SWB.vue'

  import { useRouter } from 'vue-router'

  import { typologyItemBP, itemAreaBP } from '@/assets/blueprints.js'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'
  import { useStProjects } from '@/stores/stProjects.js'
  import { DocumentSnapshot } from 'firebase/firestore'

  const router = useRouter()
  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  const stProjects = useStProjects()

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false

    router.push({ name: routeName })
  }

  const isExpanded = ref(false)

  const newItem = reactive({ ...typologyItemBP })

  const files = reactive({
    gallery: [],
    blueprints: [],
    techSpecs: [],
    docs: [],
    message: {
      title: '',
      text: ''
    },
  })

  const previewUrl = (file) => {
    return URL.createObjectURL(file)
  }
</script>

<template>
    <div class="sd-block">
    <header class="sd-header"
      @click="isExpanded = !isExpanded">
      <h1 class="sd-h3">
        Typology
      </h1>

      <button class="sd-button"
        :class="{ 'sd-button--expanded': isExpanded }">
        <span class="sd-button__cont"
          :class="{ 'sd-button__cont--expanded': isExpanded }">
          <span class="sd-button__deco"
            :class="{ 'sd-button__deco--expanded': isExpanded }">
            [
          </span>

          <span class="sd-button__txt sd-button__txt--color-main"
            :class="{ 'sd-button__txt--expanded': isExpanded }">
            {{ isExpanded ? '-' : '+' }}
          </span>

          <span class="sd-button__deco"
            :class="{ 'sd-button__deco--expanded': isExpanded }">
            ]
          </span>
        </span>
      </button>
    </header>

    <div class="sd-block__cont" v-if="isExpanded">
      <div>
        <div class="sd-canvas sd-canvas--white-095">
          <input class="sd-input"
            v-model="newItem.stairs"
            placeholder="stairs"
            type="text" />
        </div>

        <div class="sd-canvas sd-canvas--white-095">
          <input class="sd-input"
            v-model="newItem.floor"
            placeholder="floor"
            type="text" />
        </div>

        <div class="sd-canvas sd-canvas--white-095">
          <input class="sd-input"
            v-model="newItem.door"
            placeholder="door"
            type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .sd-create-proj {
    &__img-thumb {
      width: 6rem;
      height: 6rem;
    }
  }
</style>