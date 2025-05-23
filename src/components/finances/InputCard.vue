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

  import { useTitle } from '@vueuse/core'

  import { useRouter } from 'vue-router'

  // Pinia stores
  import { useStUserFinances } from '@/stores/stUserFinances.js'
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStNotes } from '@/stores/stNotes.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { RouterLink } from 'vue-router'

  const router = useRouter()
  
  const stUserFinances = useStUserFinances()

  import { currencies, activeCurrencies } from '@/assets/data/currencies.js'

  const props = defineProps({
    input: {
      type: Object,
      required: true
    }
  })  
  
  const humanDate = (val) => {
    return new Date(parseInt(val))
  }

  const currencySymbol = (currency) => {
    return activeCurrencies.find(cur => cur.cc === currency).symbol
  }

  const editInput = () => {
    stUserFinances.editingInput = props.input
    router.push({ name: 'userFinancesInput' })
  }
</script>

<template>
  <div class="sd-input-card">
    <div>
      <div>
        <span>amount: </span>
        <span>{{ input.amount }}</span>
        <span>{{ currencySymbol(input.currency) }}</span>
      </div>
      
      <div>
        <span>description: </span>
        <span>{{ input.description }}</span>
      </div>

      <div>
        <span>account: </span>
        <span>{{ input.account }}</span>
      </div>
    </div>

    <div>
      {{ activeCurrencies[0].cc }}.....
    </div>

    <div>
      <span>date created:</span>
      //
      <span>{{ humanDate(input.dateCreated).getFullYear() }}</span>
      <span>//</span>
      <span>{{ humanDate(input.dateCreated).getMonth() + 1 }}</span>
      <span>//</span>
      <span>{{ humanDate(input.dateCreated).getDate() }}</span>
    </div>

    <div>
      <button @click="editInput">
        EDIT THIS
      </button>

      <button @click="stUserFinances.delInput(input.id)">
        DELETE THIS
      </button>
    </div>
  </div>
</template>

<style lang="scss">
</style>