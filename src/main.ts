import { createApp, App } from "vue";
import { createPinia, Pinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueFeather from "vue-feather";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import RootApp from "~/App.vue";

/**
 * Styles
 */
import "~/styles/global.css";
import "@node_modules/flowbite-vue/dist/index.css";
import "@node_modules/vue3-toastify/dist/index.css";

import router from "~/router";

const app: App = createApp(RootApp);
const pinia: Pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

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
	theme: "colored",
	position: "top-center",
} as ToastContainerOptions);
app.mount("#app");
