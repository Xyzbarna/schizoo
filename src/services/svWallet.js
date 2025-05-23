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

// newWalletData is an object with the following properties:
// - name: string
// - adminUid: string
// - members: array of strings (user UIDs)
// - inputsIds: array of strings (input IDs)
const createWallet = async (newWalletData) => {
  try {
    const walletRef = await addDoc(collection(db, 'wallets'), {
      name: newWalletData.name,
      adminUid: newWalletData.adminUid,
      dateCreated: serverTimestamp(),
      dateUpdated: serverTimestamp(),
    })

    const walletId = walletRef.id

    const memberPromises = newWalletData.members.map((member) => {
      const memberRef = doc(db, 'wallets', walletId, 'members', member.memberUid)

      return setDoc(memberRef, {
        name: member.memberName,
        ratio: member.memberRatio,
      })
    })

    await Promise.all(memberPromises)

    return walletId
  } catch (error) {
    console.error('Error creant wallet:', error)
    throw error
  }
}

export { 
  createWallet,
}