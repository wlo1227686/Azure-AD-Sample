import * as Vue from 'vue'
import App from '@/App.vue'

/** Vuetify https://vuetifyjs.com */
import vuetify from '@/scripts/vuetify'

import router from '@/router' // 引入Vue-router


const app = Vue.createApp(App)

app.use(vuetify) // Vuetify
app.use(router) // vue-router
app.mount('#app')
