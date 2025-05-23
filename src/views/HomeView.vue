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

  import { useRouter, RouterLink } from 'vue-router'
  import { useTitle } from '@vueuse/core'

  // Components
  import TempNav from '@/components/TempNav.vue'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  const router = useRouter()

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false

    router.push({ name: routeName })
  }

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  useTitle(`schizoo.com // HOME`)

</script>

<template>
  <main class="sd-view sd-component">
    <header class="sd-view-header">
      // LOGIN OR REGISTER
    </header>

    <section class="sd-section"> 
      <header class="sd-section__header">
        
      </header>

      <div class="sd-section__cont">
        <input class="sd-input"
          v-model="stAuth.credentials.email"
          type="text" 
          placeholder="Email" />
        <input class="sd-input"
          v-model="stAuth.credentials.password"
          type="password" placeholder="Password" />

        <button @click="stAuth.signInUserWithEmail">Login</button>
        <button @click="stAuth.registerUserWithEmail">Register</button>
      </div>
    </section>

    <section>
      mail: {{ stAuth.credentials.email }}
      <br />
      <pre>
        {{ stAuth.credentials }}
      </pre>
      <pre>
        {{ stAuth.profile }}
      </pre>
    </section>

    <TempNav />
  </main>
</template>

<style lang="scss">
</style>