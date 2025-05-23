import { computed, createApp, reactive, ref, watch } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { 
  arrayUnion,
  collection, onSnapshot, getFirestore,
  getDocs, getDoc, addDoc, doc, setDoc, deleteDoc, updateDoc,
  runTransaction, query, orderBy, limit, where,
} from 'firebase/firestore'

import { 
  ref as storageRef, uploadBytes, getDownloadURL, deleteObject, listAll
} from 'firebase/storage'

import { useStAuth } from '@/stores/stAuth.js'

import { db, storage } from '@/js/firebase'


export const useStSettings = defineStore('stSettings', () => {
  const stAuth = useStAuth()

  const site = reactive({
    ca: {
      name: 'troba.casa',
      views: {
        home: {
          name: 'Home',
        },
        auth: {
          name: 'Auth',
        },
      }
    }
  })

  const init = () => {}

  return {
    init,
    site
  }
})