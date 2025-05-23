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
  import { DocumentSnapshot } from 'firebase/firestore'

  const router = useRouter()
  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()

  const isExpanded = ref(false)
</script>

<template>
  <div class="sd-block">
    <header class="sd-header">
      <h1 class="sd-h3">
        Calendar
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
      <div>
        <h3>start</h3>

        <input class="sd-input"
          type="number"
          min="2021"
          max="2050"
          placeholder="1984" />

        <input class="sd-input"
          type="number"
          min="1"
          max="12"
          placeholder="12" />

        <input class="sd-input"
          type="number"
          min="1"
          max="31"
          placeholder="28" />
      </div>

      <div>
        <h3>end</h3>

        <input class="sd-input"
          type="number"
          min="2021"
          max="2050"
          placeholder="1984" />

        <input class="sd-input"
          type="number"
          min="1"
          max="12"
          placeholder="12" />

        <input class="sd-input"
          type="number"
          min="1"
          max="31"
          placeholder="28" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>