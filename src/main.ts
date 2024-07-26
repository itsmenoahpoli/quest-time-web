import { createApp, App } from 'vue'
import { createPinia, Pinia } from "pinia";
import pluginPersistedState from 'pinia-plugin-persistedstate'
import RootApp from '~/App.vue'
import '~/styles/global.css'

/**
 * Plugins
 */
import router from '~/router'

const app : App = createApp(RootApp)
const pinia : Pinia = createPinia().use(pluginPersistedState)

app.use(pinia)
app.use(router)
app.mount('#app')
