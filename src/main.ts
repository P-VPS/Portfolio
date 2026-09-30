import { createApp } from "vue";

import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@/styles/main.scss";

import App from "@/App.vue";
import router from "@/router";

createApp(App).use(router).mount("#app");
