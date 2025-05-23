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
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import SVGLogin from '@/components/SVGs/SVGLogin.vue'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'



  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()

  const router = useRouter()
</script>

<template>
  <section class="sd-section sd-section-auth">
    <div class="sd-section__cont">
      <ButtonIcon 
        :bttnColor="'warning'"
        :bttnAction="stAuth.signOutUser">
        <template #bttIconSlot>
          <SVGLogin :cssStroke="['warning']"/>
        </template>
      </ButtonIcon>

      <pre>
        {{ stAuth.profile }}
      </pre>
    </div>
  </section>
</template>

<style lang="scss">
</style>