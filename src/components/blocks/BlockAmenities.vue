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
  import { DocumentSnapshot } from 'firebase/firestore'

  const router = useRouter()
  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  const stProjects = useStProjects()
  

  const isExpanded = ref(false)
  const amenityFilter = ref('')
  const amenitiesSelected = ref([])

  function findMatch(input, langObject) {
    for (const key in langObject) {
      if (!langObject.hasOwnProperty(key)) return null
      if (langObject[key].toLowerCase().includes(input.toLowerCase())) {
        return [key, langObject[key]]; // Retorna la primera coincidència
      }
    }
    return null
  }

  const amenityFiltered = computed(() => {
    if (amenityFilter.value.length < 3 && !amenitiesSelected.value.length) {
      return stProjects.amenities.slice(0, 5)
    }
    return stProjects.amenities.filter(amenity => {
      
      return amenity.name.includes(amenityFilter.value) && !amenitiesSelected.value.includes(amenity)
    }).slice(0, 5)
  })

  const toggleAmenity = (amenity) => {
    if (amenitiesSelected.value.includes(amenity)) {
      amenitiesSelected.value = amenitiesSelected.value.filter(a => a !== amenity)
    } else {
      amenitiesSelected.value.push(amenity)
    }
  }
</script>

<template>
  <div class="sd-block">
    <header class="sd-header">
      <h1 class="sd-h3">
        Amenities
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
          placeholder="search amenity"
          v-model="amenityFilter"
          type="text" />
      </div>

      <div class="sd-list sd-list--taglike">
        <button class="sd-button sd-button--taglike" 
          v-for="(amenity, iAmenity) in amenityFiltered"
          @click="toggleAmenity(amenity)">
          <span class="sd-button__cont sd-button__cont--taglike">
            <span class="sd-button__txt sd-button__txt--icon-ascii">
              {{ amenity.lang.ca }}
            </span>

            <span class="sd-icon-ascii">
              <span class="sd-icon-ascii__deco">[</span>
              <span class="sd-icon-ascii__txt">*</span>
              <span class="sd-icon-ascii__deco">]</span>
            </span>
          </span>
        </button>
      </div>

      <div class="sd-list sd-list--taglike">
        <button class="sd-button sd-button--taglike"
          v-for="(amenity, iAmenity) in amenitiesSelected"
          @click="toggleAmenity(amenity)">
          <span class="sd-button__cont sd-button__cont--taglike">
            <span class="sd-button__txt sd-button__txt--icon-ascii">
              {{ amenity.lang.ca }}
            </span>

            <span class="sd-icon-ascii sd-icon-ascii--checked">
              <span class="sd-icon-ascii__deco sd-icon-ascii__deco--checked">
                [
              </span>

              <span class="sd-icon-ascii__txt sd-icon-ascii__txt--checked">
                *
              </span>

              <span class="sd-icon-ascii__deco sd-icon-ascii__deco--checked">
                ]
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>