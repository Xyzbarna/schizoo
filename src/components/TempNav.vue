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


  const router = useRouter()

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()


  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false

    router.push({ name: routeName })
  }
</script>

<template>
  <nav class="sd-nav sd-component">
    <ul class="sd-list">
      <li class="sd-list-item">
        <button @click="() => { goToRoute('home')}">
          HOME
        </button>

        <button v-if="stAuth.profile.loggedIn"
          @click="() => { goToRoute('user')}">
          USER
        </button>

        <button v-if="stAuth.profile.loggedIn"
          @click="stAuth.signOutUser">
          Logout
        </button>
      </li>
    </ul>

    <div>
      <div>Logged in: {{ stAuth.profile.loggedIn }}</div>
      <div>UID: {{ stAuth.profile.uid }}</div>
      <div v-if="stAuth.profile.isLoading">LOADING...</div>
    </div>
  </nav>
</template>

<style lang="scss">
</style>