import { computed, createApp, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createPinia, defineStore, getActivePinia } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { 
  createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth'

import {Timestamp, arrayUnion, doc, collection, deleteDoc, onSnapshot, runTransaction, addDoc, setDoc, getDoc, updateDoc, getFirestore, serverTimestamp } from 'firebase/firestore'

import { auth, db } from '@/js/firebase.js'

const registerUserWithEmail = async ({ email, password }) => {
  console.log('registerUserWithEmail', email, password)
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password)
    const user = resp.user
    const userDocRef = doc(db, 'users', user.uid)

    await setDoc(userDocRef, {
      dateCreated: serverTimestamp(),
      dateUpdated: serverTimestamp(),
    })

    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

const getUserDoc = async (uid) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) throw new Error('User not found')

  return docSnap.data()
}

const watchUserDoc = (uid, cb) => {
  const docRef = doc(db, 'users', uid)

  return onSnapshot(docRef, cb)
}

const updateUserDoc = async (uid, profileData) => {
  const userDocRef = doc(db, 'users', uid)

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef)

      if (!userDoc.exists()) {
        throw new Error('Document does not exist!')
      }

      transaction.update(userDocRef, profileData)
    })
  } catch (e) {
    throw e
  }
}

const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

export { 
  registerUserWithEmail,
  getUserDoc,
  watchUserDoc,
  updateUserDoc,
  signInWithEmail
}