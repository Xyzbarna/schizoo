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

  import _ from 'lodash'

  // helpers

  // components
  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import BttnMain from '@/components/buttons/BttnMain.vue'


  // Pinia stores
  import { useStAuth } from '@/stores/stAuth.js'

  const stAuth = useStAuth()

  const errorMsg = computed(() => {
    switch (stAuth.error.code) {
      case 'auth/missing-email':
        return 'Please enter your email'
        break
      
      case 'auth/invalid-email':
        return 'Please enter a valid email'
        break
      
      case 'auth/missing-password':
        return 'Please enter your password'
        break

      case 'auth/invalid-credential':
        return 'Please check your credentials'
        break

      case 'auth/weak-password':
        return 'Password must be  >= 6 chars'
        break
    
      default:
        return 'Something went wrong'
        break
    }
  })

  const bttnLogin = reactive({
    action: { func: stAuth.signInUser, payload: [] },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo : { txt: 'login', deco: true },
    imago : { txt: '', deco: true }
  })

  const bttnRegister = reactive({
    action: { func: stAuth.registerUser, payload: [] },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo : { txt: 'register', deco: true },
    imago : { txt: '', deco: true }
  })

  const bttnLogout = reactive({
    action: { func: stAuth.signOutUser, payload: [] },
    bttn: { 
      type: 'button', 
      bgColor: `accept`,
      color: 'main',
      paperColor: `paper`
    },
    logo : { txt: 'logout', deco: true },
    imago : { txt: '', deco: true }
  })
</script>

<template>
  <section class="sd-section">
    <form class="sd-form"
      @submit.prevent>
      <input class="sd-input sd-input--email"
        v-if="!stAuth.profile.loggedIn" 
        autocomplete="on"
        type="email" 
        placeholder="email"
        v-model="stAuth.credentials.email">
    
      <input class="sd-input sd-input--password"
        v-if="!stAuth.profile.loggedIn" 
        autocomplete="off"
        type="password" 
        placeholder="password"
        v-model="stAuth.credentials.password">

      <BttnMain v-if="!stAuth.profile.loggedIn" 
        :action="bttnLogin.action"
        :bttn="bttnLogin.bttn"
        :logo="bttnLogin.logo"
        :imago="bttnLogin.imago"/>

      <BttnMain v-if="!stAuth.profile.loggedIn" 
        :action="bttnRegister.action"
        :bttn="bttnRegister.bttn"
        :logo="bttnRegister.logo"
        :imago="bttnRegister.imago"/>

      <BttnMain v-if="stAuth.profile.loggedIn" 
        :action="bttnLogout.action"
        :bttn="bttnLogout.bttn"
        :logo="bttnLogout.logo"
        :imago="bttnLogout.imago"/>
    </form>
  </section>
</template>

<style lang="scss">
</style>