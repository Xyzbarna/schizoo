import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'

import { useStAuth } from '@/stores/stAuth'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// Makes router available in Pinia stores
pinia.use(({ store }) => { store.router = markRaw(router) })

app.use(pinia)
app.use(router)

const stAuth = useStAuth()
stAuth.init()

app.mount('#app')
