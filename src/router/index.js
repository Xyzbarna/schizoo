import { createRouter, createWebHistory } from 'vue-router'

import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'


import { auth } from '@/js/firebase.js'

import { useStAuth } from '@/stores/stAuth'

import HomeView from '@/views/HomeView.vue'
// import ContactView from '@/views/ContactView.vue'
// import LegalView from '@/views/LegalView.vue'
// import SettingsView from '@/views/SettingsView.vue'
// import UserView from '@/views/UserView.vue'
// import BlogView from '@/views/BlogView.vue'
// import PostView from '@/views/PostView.vue'
// import InputView from '@/views/InputView.vue'

// import AuthView from '@/views/AuthView.vue'
// import UserFinancesView from '@/views/UserFinancesView.vue'
// import UserFinancesInputView from '@/views/UserFinancesInputView.vue'
// import ContactView from '@/views/ContactView.vue'
// import CreateView from '@/views/CreateView.vue'
// import LegalView from '@/views/LegalView.vue'
// import WelcomeView from '@/views/WelcomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/project/:projectId/edit',
      name: 'project-edit',
      component: () => import('@/views/ProjectEditView.vue')
    },
    // {
    //   path: '/blog',
    //   name: 'blog',
    //   component: () => import('@/views/BlogView.vue')
    // },
    // {
    //   path: '/blog/:postId',
    //   name: 'post',
    //   component: () => import('@/views/PostView.vue')
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    // on reload, keep the position
    if (!from.name) return savedPosition

    // if (to.name !== 'home') return { top: 144, behavior: 'smooth' }

    return { top: 0, behavior: 'smooth' }
  },
})



router.beforeEach(async (to, from) => {
  const stAuth = useStAuth()

  console.log('stAuth', stAuth.profile)

  // User is not logged in
  // if (!stAuth.profile.uid) {
  //   if (to.name !== 'home') {
  //     // User is logged in, redirect to user page
  //     return { name: 'home' }
  //   }
  //   // Redirect to home if they try to access any other route than home or contact
  //   // if (
  //   //   to.name !== 'home' && 
  //   //   to.name !== 'contact' && 
  //   //   to.name !== 'legal' ) {
  //   //   return { name: 'home' }
  //   // }
  // //   if (to.name === 'user') return { name: 'auth' }
  // //   if (to.name === 'project-new') return { name: 'auth' }
  // //   console.log('User NOT logged in, checked in the route guard')
  // // } else {
  //   // if (to.name === 'user') return { name: 'auth' }

  // } else {
  //   if (to.name === 'home') {
  //     // User is logged in, redirect to user page
  //     return { name: 'user' }
  //   }
  // }
})

export default router