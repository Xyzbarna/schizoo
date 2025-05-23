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

  import { useRouter } from 'vue-router'

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

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  })

  defineEmits(['update:data'])

  const localDescriptions = computed({
    get: () => props.data,
    set: (newValues) => emit('update:data', { ...props.data, ...newValues }),
  })
</script>

<template>
  <div class="sd-block">
    <header class="sd-header">
      <h1 class="sd-h3">
        Descriptions
      </h1>

      <button class="sd-button"
        :class="{ 'sd-button--expanded': isExpanded }"
        @click="isExpanded = !isExpanded">
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
      <div class="sd-canvas sd-canvas--white-095">
        <textarea class="sd-input"
          v-model="localDescriptions.descFull"
          placeholder="project's description"></textarea>
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <textarea class="sd-input"
          v-model="localDescriptions.descShort"
          placeholder="project's short description"></textarea>
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <textarea class="sd-input"
          v-model="localDescriptions.descSold"
          placeholder="project's sold description"></textarea>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>