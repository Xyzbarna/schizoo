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
  createWallet, subscribeToUserWallets
} from '@/services/svWallets.js'

export const useStWallets = defineStore('stWallets', () => {
  const router = useRouter()
  const stAuth = useStAuth()

  const wallets = ref([])
  const isLoading = ref(false)

  const resetWallets = () => { wallets.value = []}

  let snapshotWallets = null

  const walletForm = reactive({ name: 'pocket money'})

  const resetWalletForm = () => { walletForm.name = ''}

  const error = reactive({ code: null, message: null })

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

  const init = async () => {
    console.log('wallets init!')
    isLoading.value = true
    resetError()

    if (stAuth.profile.uid === null) {
      console.error('No user logged in')
      isLoading.value = false
      return
    }

    if (snapshotWallets) {
      snapshotWallets()
      snapshotWallets = null
    }

    try {
      console.log('Subscribing to user wallets...', stAuth.profile.uid)
      snapshotWallets = subscribeToUserWallets(stAuth.profile.uid, (snapshot) => {
        const updatedWallets = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        wallets.value = updatedWallets
      })
    } catch (e) {
      error.value.code = e.code || 'subscription-failed'
      error.value.message = e.message || 'Failed to subscribe to wallets'
    } finally {
      isLoading.value = false
    }
  }

  const unsubscribeSnapshotWallets = () => {
    if (snapshotWallets) {
      snapshotWallets()
      snapshotWallets = null
    }
  }



  return {
    init,
    createNewWallet,
    isLoading,
    resetWalletForm,
    walletForm,
    wallets,
    resetWallets,
    snapshotWallets,
    unsubscribeSnapshotWallets
  }
}, { persist: { omit: ['credentials.password', 'error.code', 'error.message', 'profile'] } })