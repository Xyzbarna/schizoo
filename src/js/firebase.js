import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQSfU4Qvx6SFVgiBBX1AABYWkecS15z28',
  authDomain: 'omni-5ddda.firebaseapp.com',
  projectId: 'omni-5ddda',
  storageBucket: 'omni-5ddda.appspot.com',
  messagingSenderId: '1044011474781',
  appId: '1:1044011474781:web:8b996ea928eef46e7692b4',
  measurementId: 'G-1QQKCQJZKE'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

const analytics = getAnalytics(app)

export { db, auth, analytics, storage }

