import { createApp, App } from "vue";
import { createPinia, Pinia } from "pinia";
import pluginPersistedState from "pinia-plugin-persistedstate";
import VueFeather from "vue-feather";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import RootApp from "~/App.vue";
import "~/styles/global.css";
import "../node_modules/flowbite-vue/dist/index.css";

import router from "~/router";

const app: App = createApp(RootApp);
const pinia: Pinia = createPinia().use(pluginPersistedState);

/**
 * Components
 */
app.component(VueFeather.name!, VueFeather);

/**
 * Plugins
 */
app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
	autoClose: 3000,
} as ToastContainerOptions);
app.mount("#app");
