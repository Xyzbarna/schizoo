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
  
  const statusSale = ref([
    {
      name: 'available',
      lang: {
        ca: 'disponible',
        en: 'available',
        es: 'disponible'
      }
    },
    {
      name: 'reserved',
      lang: {
        ca: 'reservat',
        en: 'reserved',
        es: 'reservado'
      }
    },
    {
      name: 'sold',
      lang: {
        ca: 'vendut',
        en: 'sold',
        es: 'vendido'
      }
    },
    {
      name: 'soon',
      lang: {
        ca: 'properament',
        en: 'soon',
        es: 'próximamente'
      }
    },
  ])

  const selectedStatus = reactive({
    statusSale: 'soon',
    statusDev: 'soon',
    typeDev: 'TBD'
  })

  const statusDev = ref([
    {
      name: 'inprogress',
      lang: {
        ca: 'en construcció',
        en: 'in progress',
        es: 'en construcción'
      }
    },
    {
      name: 'finished',
      lang: {
        ca: 'acabat',
        en: 'finished',
        es: 'acabado'
      }
    },
    {
      name: 'delivered',
      lang: {
        ca: 'entregat',
        en: 'delivered',
        es: 'entregado'
      }
    },
    {
      name: 'soon',
      lang: {
        ca: 'properament',
        en: 'soon',
        es: 'próximamente'
      }
    }
  ])

  const typesDev = ref([
    {
      name: 'house',
      lang: {
        ca: 'casa',
        en: 'house',
        es: 'casa'
      }
    },
    {
      name: 'flat',
      lang: {
        ca: 'pis',
        en: 'flat',
        es: 'piso'
      }
    },
    {
      name: 'duplex',
      lang: {
        ca: 'dúplex',
        en: 'duplex',
        es: 'dúplex'
      }
    },
    {
      name: 'penthouse',
      lang: {
        ca: 'àtic',
        en: 'penthouse',
        es: 'ático'
      }
    },
    {
      name: 'groundfloor',
      lang: {
        ca: 'baixos',
        en: 'ground floor',
        es: 'bajos'
      }
    },
    {
      name: 'loft',
      lang: {
        ca: 'estudi',
        en: 'loft',
        es: 'estudio'
      }
    },
    {
      name: 'TBD',
      lang: {
        ca: 'TBD',
        en: 'TBD',
        es: 'TBD'
      }
    }
  ])
</script>

<template>
  <div class="sd-block">
    <header class="sd-header">
      <h1 class="sd-h3">
        Status
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
      <h3>sale status</h3>

      <div class="sd-list">
        <button class="sd-button" 
          v-for="(statSale, isSale) in statusSale"
          @click="stProjects.proj.devStatus = statSale.name">
          <span class="sd-button__cont">
            <span class="sd-button__txt">
              {{ statSale.lang.ca }}
            </span>

            <span v-if="statSale.name == stProjects.proj.devStatus">
              *
            </span>
          </span>
        </button>
      </div>

      <h3>dev status</h3>

      <div class="sd-list">
        <button class="sd-button" 
          v-for="(statDev, iSDev) in statusDev"
          @click="stProjects.proj.devStatus = statDev.name">
          <span class="sd-button__cont">
            <span class="sd-button__txt">
              {{ statDev.lang.ca }}
            </span>

            <span v-if="statDev.name == stProjects.proj.devStatus">
              *
            </span>
          </span>
        </button>
      </div>

      <h3>dev type</h3>

      <div class="sd-list">
        <button class="sd-button" 
          v-for="(typeDev, iTyDev) in typesDev"
          @click="stProjects.proj.devType = typeDev.name">
          <span class="sd-button__cont">
            <span class="sd-button__txt">
              {{ typeDev.lang.ca }}
            </span>

            <span v-if="typeDev.name == stProjects.proj.devType">
              *
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>