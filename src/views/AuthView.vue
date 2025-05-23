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
  import { useStSettings } from '@/stores/stSettings.js'

  const router = useRouter()
  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  const stSettings = useStSettings()

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false

    router.push({ name: routeName })
  }

  const acceptImages = computed(() => {
    return 'image/jpeg,image/png,image/gif,image/jpg'
  })

  const acceptPDF = computed(() => {
    return 'application/pdf,application/x-pdf,application/acrobat,application/x-acrobat,text/pdf,text/x-pdf'
  })

  const onFileSelected = (event, targ) => {
    console.log(event.target.files)
    stUser.newFiles[targ] = event.target.files
  }

  const previewUrl = (file) => {
    return URL.createObjectURL(file)
  }

  const title = computed(() => {
    let title = stSettings.site.ca.name
    let viewTitle = stSettings.site.ca.views.auth.name
    return `${title} // ${viewTitle}`
  })

  useTitle(`${title.value}`)

  const createProject = async () => {
    let projId = await stUser.addFSDoc('project', ['projects'])

    // stUser.newItem.address.projId = projId
    // let addressId = await stUser.addFSDoc('address', ['addresses'])

    console.log('projId', projId)
    
    // stUser.addFSFiles(
    //   ['public', 'project', projId, 'gallery'],
    //   ['projects', projId, 'gallery'],
    //   'gallery')

    // stUser.addFSFiles(
    //   ['public', 'project', projId, 'blueprints'],
    //   ['projects', projId, 'blueprints'],
    //   'blueprints')
    
    stUser.newFiles.gallery = null
    stUser.newFiles.blueprints = null
  }

  const editProject = async () => {
    console.log('edit project')
  }

  onMounted(() => {
    stUser.getFSDocs(['projects'], 'projects')
  })
</script>

<template>
  <main class="sd-view">
    <SectionFormAuth />
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