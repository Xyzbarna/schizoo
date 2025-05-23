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

  import { useRouter } from 'vue-router'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  const router = useRouter()
  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()

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

  useTitle(`planner.express // USER`)

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
    <header class="sd-view-header">
      <TextBlock 
        :text="'user'"
        :type="'h1'"
        :deco="true" />
    </header>

    <section class="sd-section"> 
      <header class="sd-section__header">
        <TextBlock 
          :text="`project ${stAuth.profile.email}`"
          :type="'h1'"
          :deco="false"/>
      </header>

      <div class="sd-section__cont">
        <div class="sd-section__cont-bg">
          <div class="sd-section-user__block">
            <input class="sd-input sd-input--files"
              id="project-gallery"
              type="file"
              multiple
              :accept="acceptImages"
              @change="onFileSelected($event, 'gallery')" />

            <label class="sd-input-label sd-input-label--files"
              for="project-gallery">
              Choose gallery images
            </label>

            <div>
              <div v-for="file in stUser.newFiles.gallery">
                <pre>{{ file.name }}</pre>
              </div>
            </div>
          </div>

          <div class="sd-section-user__block">
            <input class="sd-input sd-input--files"
              id="project-blueprints"
              type="file"
              multiple
              :accept="acceptPDF"
              @change="onFileSelected($event, 'blueprints')" />

            <label class="sd-input-label sd-input-label--files"
              for="project-blueprints">
              Choose blueprints files
            </label>

            <div>
              <div v-for="file in stUser.newFiles.blueprints">
                <pre>{{ file.name }}</pre>
              </div>
            </div>
          </div>

          <div class="sd-section-user__block">
            <input class="sd-input"
              placeholder="project's name"
              v-model="stUser.newItem.project.name"
              type="text" />

              <input class="sd-input"
              placeholder="address line 1"
              v-model="stUser.newItem.line1"
              type="text" />

            <input class="sd-input"
              placeholder="address line 2"
              v-model="stUser.newItem.line2"
              type="text" />

            <input class="sd-input"
              placeholder="address number"
              v-model="stUser.newItem.number"
              type="text" />

            <input class="sd-input"
              placeholder="address letter"
              v-model="stUser.newItem.letter"
              type="text" />

            <input class="sd-input"
              placeholder="gmaps link"
              v-model="stUser.newItem.gmaps"
              type="text" />
            
            <textarea class="sd-input"
              placeholder="project's long description"
              v-model="stUser.newItem.project.descFull">
            </textarea>

            <textarea class="sd-input"
              placeholder="project's short description"
              v-model="stUser.newItem.project.descShort">
            </textarea>

            <textarea class="sd-input"
              placeholder="project's sold description"
              v-model="stUser.newItem.project.descSold">
            </textarea>
          </div>


          <div class="sd-section-user__block">
            <ButtonComp 
              :bttnAction="createProject"
              :bttnType="'action'"
              :bttnTxt="`create project`"
              :bttnColor="'accept'" />
          </div>
        </div>
      </div>
    </section>
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