import { computed, createApp, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createPinia, defineStore, getActivePinia } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { 
  createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth'

import { doc, collection, deleteDoc, onSnapshot, runTransaction, addDoc, setDoc, getDoc, getFirestore, serverTimestamp } from 'firebase/firestore'

import { auth, db } from '@/js/firebase.js'

// blueprints
import {
  itemBP,
  projBP,
  addressBP,
  credentialsBP,
  typologyItemBP,
  profileBP,
} from '@/assets/blueprints.js'

// pinia stores
import { useStAuth } from '@/stores/stAuth.js'
import { timestamp } from '@vueuse/core'
import { time } from 'vue-gtag'

// Services
import {
  createWallet
} from '@/services/svWallet.js'

export const useStWallet = defineStore('stWallet', () => {
  let walletsSnapshot = null
  const router = useRouter()

  const stAuth = useStAuth()

  const walletForm = reactive({
    name: 'pocket money'
  })

  const resetForm = () => {
    walletForm.name = ''
  }

  const isLoading = ref(false)

  const error = reactive({
    code: null,
    message: null
  })

  const resetError = () => {
    error.code = null
    error.message = null
  }

  const createNewWallet = async () => {
    isLoading.value = true
    resetError()

    try {
      const walletId = await createWallet({
        name: walletForm.name,
        adminUid: stAuth.profile.uid,
        members: [
          {
            memberUid: stAuth.profile.uid,
            memberName: stAuth.profile.name || '',
            memberRatio: 'equal',
            memberType: 'admin',
          }
        ]
      })

      console.log('Wallet creada amb ID:', walletId)
      resetForm()

      // podries redirigir o guardar walletId si cal
      return walletId
    } catch (e) {
      error.code = e.code || null
      error.message = e.message || 'Error creant wallet'
      console.error('Error creant wallet:', e)
    } finally {
      isLoading.value = false
    }
  }


  return {
    createNewWallet,
    isLoading,
    resetForm,
    walletForm,
  }
}, { persist: { omit: ['credentials.password', 'error.code', 'error.message', 'profile'] } })