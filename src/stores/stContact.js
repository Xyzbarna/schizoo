import { computed, createApp, reactive, ref, watch } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import axios from 'axios'

import { 
  arrayUnion,
  collection, onSnapshot, getFirestore,
  getDocs, getDoc, addDoc, doc, setDoc, deleteDoc, updateDoc,
  runTransaction, query, orderBy, limit, where,
} from 'firebase/firestore'

import { useStAuth } from '@/stores/stAuth.js'

import { db } from '@/js/firebase'

import { useStUser } from '@/stores/stUser.js'

// compte gratuït limitat a 50 enviaments al mes
const urlA = 'https://usebasin.com/f/ba5406ee4f38.json'
// compte de pagament
const urlB = 'https://usebasin.com/f/304e96598333.json'

export const useStContact = defineStore('stContact', () => {
  const stAuth = useStAuth()
  const stUser = useStUser()

  const contactFormFields = reactive({
    name: null,
    email: null,
    message: null,
    origin: 'SCHiZOo APP',
    status: 'ready'
  })

  const submitContactForm = async () => {
    contactFormFields.status = 'sending'

    if (stUser.legalAccepted === false) return false
    
    try {
      const resp = await axios({ 
        method: 'POST', 
        url: urlB,
        body: contactFormFields,
        dataType: 'json',
      })
  
      console.log('resp', resp)
  
      contactFormFields.name = null
      contactFormFields.email = null
      contactFormFields.message = null
      contactFormFields.status = 'sent'
    } catch (error) {
      contactFormFields.status = 'error'
    }
    finally {
      setTimeout(() => { contactFormFields.status = 'ready' }, 1000)
    }
  }

  return {
    contactFormFields,
    submitContactForm,
  }
})




