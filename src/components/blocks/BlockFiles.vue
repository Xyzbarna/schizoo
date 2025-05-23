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

  const isExpanded = ref(false)

  const props = defineProps({
    blockTitle: { type: String, },
    inputIdLabel: { type: String, },
    // images, pdfs
    inputAcceptType: { type: String, },
    // docs, gallery
    fileTarget: { type: String, },
  })

  const fileTypeAccepted = reactive({
    images: 'image/jpeg,image/png,image/gif,image/jpg',
    pdfs: 'application/pdf,application/x-pdf,application/acrobat,application/x-acrobat,text/pdf,text/x-pdf',
  })

  const onFileSelected = (event, targ) => {
    let files = event.target.files
    console.log('onFileSelected', event.target.files)
    stProjects.proj[targ] = [ ...files ]
  }
</script>

<template>
  <div class="sd-block">
    <header class="sd-header"
      @click="isExpanded = !isExpanded">
      <h1 class="sd-h3">
        {{ blockTitle }}
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
      <input class="sd-input sd-input--files"
        :id="`target-${inputIdLabel}`"
        :type="'file'"
        multiple
        :accept="fileTypeAccepted[inputAcceptType]"
        @change="onFileSelected($event, fileTarget)" />

      <label class="sd-input-label sd-input-label--files"
        :for="`target-${inputIdLabel}`">
        Choose {{ inputAcceptType }}
      </label>

      <div>
        <div v-for="(file, iFile) in stProjects.proj[fileTarget]">
          {{ file.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>