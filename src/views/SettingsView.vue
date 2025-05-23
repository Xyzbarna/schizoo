<script setup>
  import { 
    onMounted,
    ref, 
  } from 'vue'

  import { useRouter, RouterLink } from 'vue-router'
  import { useTitle } from '@vueuse/core'
  import { v4 as uuidv4 } from 'uuid'

  // helpers
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  // components
  import TextBlock from '@/components/TextBlock.vue'
  import SettingsItem from '@/components/SettingsItem.vue'
  import ButtonComp from '@/components/buttons/ButtonComp.vue'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  
  const router = useRouter()

  useTitle(`schizoo.com // SETTINGS`)
</script>

<template>
  <main class="sd-view">
    <header class="sd-view-header">
      <div class="sd-view-header__block sd-view-header__block--desc">
        <TextBlock :text="'settings'" :type="'title'" />
      </div>
    </header>

    <section class="sd-section">
      <div class="sd-section__cont">
        <SettingsItem :stType="'accounts'" />
        <SettingsItem :stType="'categories'" />
        <SettingsItem :stType="'tags'" :limit="25" />

        <div class="sd-section__nav">
          <ButtonComp 
            :bttnAction="() => { console.log('ok, clicked') }"
            :bttnType="'action'"
            :bttnTxt="`continue`"
            :bttnColor="'accept'">
          </ButtonComp>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  .sd-settings-item {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .test {
      width: 3rem;
      height: 3rem;
    } 
  }
</style>