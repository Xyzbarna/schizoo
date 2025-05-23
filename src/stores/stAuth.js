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
import { useStUser } from '@/stores/stUser.js'
import { timestamp } from '@vueuse/core'
import { time } from 'vue-gtag'

// Services
import {
  registerUserWithEmail as svRegisterUserWithEmail,
  signInWithEmail as svSignInWithEmail,
  getUserDoc,
  watchUserDoc,
  updateUserDoc as svUpdateUserDoc,
} from '@/services/svAuth.js'

import { createWallet } from '@/services/svWallets.js'

export const useStAuth = defineStore('stAuth', () => {
  let userSnapshot = null
  const router = useRouter()

  const profile = reactive(_.cloneDeep(profileBP))
  profile.address = reactive(_.cloneDeep(addressBP))

  const resetProfile = () => {
    Object.assign(profile, _.cloneDeep(profileBP))
    profile.address = reactive(_.cloneDeep(addressBP))
  }

  const credentials = reactive(_.cloneDeep(credentialsBP))

  const resetCredentials = () => {
    Object.assign(credentials, _.cloneDeep(credentialsBP))
  }

  const error = reactive({ code: null, message: null })

  const resetError = () => {
    error.code = null
    error.message = null
  }

  const stUser = useStUser()

  const init = async () => {    
    profile.isLoading = true

    console.log('auth init!')

    onAuthStateChanged(auth, async (user) => {
      console.log('onAuthStateChanged')
      if (user) {
        console.log('User is signed in:', user.uid)

        profile.uid = user.uid
        profile.isLoading = false
        profile.loggedIn = true
      } else {
        // User is signed out
        resetProfile()

        profile.loggedIn = false
        console.log('No user logged in')
      }

      profile.isLoading = false
    })
  }

  const registerUserWithEmail = async () => {
    profile.isLoading = true

    const registerUserPayload = {
      email: credentials.email,
      password: credentials.password
    }

    try {
      const user = await svRegisterUserWithEmail(registerUserPayload)

      // Signed up 
      profile.email = user.email
      profile.loggedIn = true
      profile.uid = user.uid
      
      resetCredentials()
      resetError()

      createWallet({
        name: 'pocket money',
        adminUid: profile.uid
      })

      console.log('function registerUser() executed')
    } catch (e) {
      error.code = e.code
      error.message = e.message
    } finally {
      profile.isLoading = false
      router.push({ name: 'user' })
    }
  }

  // callback function to update profile from snapshot
  // getUser is called when user is logged in
  const updateProfileFromSnapshot = (doc) => {
    const data = doc.data()
    profile.dateCreated = data.dateCreated
    profile.datesUpdated = data.datesUpdated
  }

  const getUser = async (uid) => {
    profile.isLoading = true

    // check if user snapshot is already running, if so stop it
    if (userSnapshot) userSnapshot() 

    try {
      const userData = await getUserDoc(uid)
      profile.dateCreated = userData.dateCreated
      profile.datesUpdated = userData.datesUpdated

      // Subscribe to updates
      userSnapshot = watchUserDoc(uid, updateProfileFromSnapshot)
    } catch (e) {
      error.code = e.code
      error.message = e.message
    } finally {
      profile.isLoading = false
    }
  }

  const updateUserDoc = async () => {
    const profileUpdate = {
      name: profile.name,
      nickname: profile.nickname
    }

    try {
      await svUpdateUserDoc(profile.uid, profileUpdate)
    } catch (e) {
      error.code = e.code || null
      error.message = e.message || 'Error updating profile'
      console.error(e)
    }
  }



  const signInUserWithEmail = async () => {
    profile.isLoading = true
    
    const email = credentials.email
    const password = credentials.password

    try {
      const user = await svSignInWithEmail(email, password)

      // Signed up 
      profile.uid = user.uid
      profile.email = user.email
      profile.loggedIn = true

      await getUser(user.uid)

      // router.replace({ name: 'user' })
      console.log('function signInUser() executed')
    } catch (e) {
      error.code = e.code
      error.message = e.message
    } finally {
      resetCredentials()
      resetError()
      profile.isLoading = false
      // router.push({ name: 'user' })
    }
  }

  const signOutUser = async () => {
    try {
      profile.isLoading = true
      resetCredentials()

      await signOut(auth)
      
      router.replace({ name: 'home' })
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
    } finally {
      resetProfile()
      resetError()

      stUser.accounts = []
      stUser.categories = []
      stUser.tags = []

      profile.isLoading = false

      router.replace({ name: 'home' })
    }
  }

  return {
    init,
    registerUserWithEmail,
    signInUserWithEmail,
    signOutUser,
    profile,
    error,
    credentials,
    updateUserDoc,
  }
}, { persist: { omit: ['credentials.password', 'error.code', 'error.message', 'profile'] } })