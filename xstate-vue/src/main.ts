import { createApp } from "vue";
import App from "./App.vue";
import "milligram";
import { inspect } from "@xstate/inspect";
inspect();

createApp(App).mount("#app");
