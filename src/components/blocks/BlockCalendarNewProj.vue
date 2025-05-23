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

  const yStart= ref(1984)
  const mStart = ref(4)
  const dStart = ref(23)

  const yEnd= ref(1984)
  const mEnd = ref(4)
  const dEnd = ref(24)


  const isYValid = (yyyy) => (yyyy >= 1900 && yyyy <= 2100)
  const isMValid = (mm) => (mm >= 1 && mm <= 12)

  const maxDInM = (yyyy, mm) => {
    if (!isMValid(mm)) return 31

    return new Date(yyyy, mm, 0).getDate()
  }

  const maxDStart = computed(() => maxDInM(yStart.value, mStart.value))
  const maxDEnd = computed(() => maxDInM(yEnd.value, mEnd.value))


  const dateStart = computed(() => {
    if (!isYValid(yStart.value) || !isMValid(mStart.value)) return null

    let ymd = new Date(yStart.value, mStart.value - 1, dStart.value)

    stProjects.proj.dates.start = ymd

    return ymd
  })

  const dateEnd = computed(() => {
    if (!isYValid(yEnd.value) || !isMValid(mEnd.value)) return null

    let ymd = new Date(yEnd.value, mEnd.value - 1, dEnd.value)

    stProjects.proj.dates.end = ymd

    return ymd
  })

  const datesOrderAcceptable = computed(() => {
    if (dateEnd.value.getTime() < dateStart.value.getTime()) return false

    return true
  })

</script>

<template>
  <div class="sd-block">
    <header class="sd-header"
      @click="isExpanded = !isExpanded">
      <h1 class="sd-h3">
        Calendar
      </h1>

      <button class="sd-button"
        :class="{ 'sd-button--expanded': isExpanded }">
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

        <label for="yStartNewProj">Any:</label>
        <input
          id="yStartNewProj"
          type="number"
          min="1984"
          max="2184"
          placeholder="yyyy"
          v-model.number="yStart"
        />

        <label for="mStartNewProj">Mes:</label>
        <input
          id="mStartNewProj"
          type="number"
          min="1"
          max="12"
          placeholder="mm"
          :disabled="!isYValid"
          v-model.number="mStart"
        />

        <label for="dStartNewProj">Dia:</label>
        <input
          id="dStartNewProj"
          type="number"
          min="1"
          :max="maxDStart"
          placeholder="dd"
          :disabled="!isMValid"
          v-model.number="dStart"
        />
        <div>
          {{ dateStart }}
        </div>
      </div>

      <div>
        <h3>end</h3>

        <label for="yEndNewProj">Any:</label>
        <input
          id="yEndNewProj"
          type="number"
          min="1984"
          max="2184"
          placeholder="yyyy"
          v-model.number="yEnd"
        />

        <label for="mEndNewProj">Mes:</label>
        <input
          id="mEndNewProj"
          type="number"
          min="1"
          max="12"
          placeholder="mm"
          :disabled="!isYValid"
          v-model.number="mEnd"
        />

        <label for="dEndNewProj">Dia:</label>
        <input
          id="dEndNewProj"
          type="number"
          min="1"
          :max="maxDEnd"
          placeholder="dd"
          :disabled="!isMValid"
          v-model.number="dEnd"
        />
        <div>
          {{ dateEnd }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>