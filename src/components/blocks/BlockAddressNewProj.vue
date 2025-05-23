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

  const router = useRouter()
  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  const stProjects = useStProjects()

  const isExpanded = ref(false)
  

</script>

<template>
  <div class="sd-block">
    <header class="sd-header">
      <h1 class="sd-h3">
        Address
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
      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          placeholder="Street"
          v-model="stProjects.proj.address.line1"
          type="text" />
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          placeholder="Number"
          v-model="stProjects.proj.address.number"
          type="text" />
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          placeholder="City"
          v-model="stProjects.proj.address.city"
          type="text" />
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          placeholder="Neighbourhood"
          v-model="stProjects.proj.address.neighbourhood"
          type="text" />
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          placeholder="ZIP"
          v-model="stProjects.proj.address.zip"
          type="text" />
      </div>

      <div class="sd-canvas sd-canvas--white-095">
        <input class="sd-input"
          placeholder="gMaps link"
          v-model="stProjects.proj.address.gmaps"
          type="text" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>