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
  import { useStProjects } from '@/stores/stProjects.js'

  const router = useRouter()
  // init stores
  const stProjects = useStProjects()
  

  const isExpanded = ref(false)

  const toggleAmenity = (amenity) => {
    let idIsInArray = stProjects.proj.amenitiesIds.find(id => id === amenity.id)
    
    if (idIsInArray) {
      stProjects.proj.amenitiesIds = stProjects.proj.amenitiesIds.filter(id => id !== amenity.id)
    } else {
      stProjects.proj.amenitiesIds.push(amenity.id)
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
      <div class="sd-list sd-list--taglike">
        <button class="sd-button sd-button--taglike" 
          v-for="(amenity, iAmenity) in stProjects.proj.amenities"
          @click="toggleAmenity(amenity)">
          <span class="sd-button__cont sd-button__cont--taglike">
            <span class="sd-button__txt sd-button__txt--icon-ascii">
              {{ amenity.lang.ca }}
            </span>

            <span class="sd-icon-ascii">
              <span class="sd-icon-ascii__deco">[</span>
              <span class="sd-icon-ascii__txt"
                :class="{ 
                  'sd-icon-ascii__txt--selected': amenity.selected,
                  'sd-icon-ascii__txt--unselected': !amenity.selected
                }">
                *
              </span>
              <span class="sd-icon-ascii__deco">]</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>