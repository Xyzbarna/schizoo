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

  import { msgBP } from '@/assets/blueprints.js'

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

  const newMsg = reactive({ ...msgBP })

  console.log('msgBP', newMsg)

  const submitMsg = () => {
    stProjects.proj.messages.push({ ...newMsg })

    Object.assign(newMsg, msgBP)
  }
</script>

<template>
  <div class="sd-block">
    <header class="sd-header"
      @click="isExpanded = !isExpanded">
      <h1 class="sd-h3">
        Messages
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
      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          v-model="newMsg.title"
          placeholder="msg title"
          type="text" />
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <textarea class="sd-input"
          v-model="newMsg.message"
          placeholder="txt msg"></textarea>
      </div>

      <div class="sd-list sd-list--taglike">
        <button class="sd-button sd-button--taglike" 
          v-for="(clearance, iClearance) in ['admin', 'owner', 'buyer', 'visitor']">
          <span class="sd-button__cont sd-button__cont--taglike">
            <span class="sd-button__txt sd-button__txt--icon-ascii">
              {{ clearance }}
            </span>

            <span class="sd-icon-ascii">
              <span class="sd-icon-ascii__deco">[</span>
              <span class="sd-icon-ascii__txt"
                :class="{ 
                  'sd-icon-ascii__txt--selected': false,
                  'sd-icon-ascii__txt--unselected': false
                }">
                *
              </span>
              <span class="sd-icon-ascii__deco">]</span>
            </span>
          </span>
        </button>
      </div>



      <div @click="submitMsg">
        Submit msg
      </div>

      <div v-if="stProjects.proj.messages">
        <div v-for="(msg, iMsg) in stProjects.proj.messages">
          {{ iMsg }} - {{ msg }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>