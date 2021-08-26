<template>
  <div class="App">
    <div>
      <h1>Examples</h1>
      <div class="example-buttons">
        <button @click="clickOption('lightBulp')">Light Bulp</button>
        <button @click="clickOption('randomCat')">Random Cat</button>
        <button @click="clickOption('downloader')">Downloader</button>
      </div>
    </div>
    <div v-if="isRandomCat">
      <RandomCat />
    </div>
    <div v-if="isLightBulp"><LightBulp /></div>
    <div v-if="isDownloader"><Downloader /></div>
    <!-- <div>{state === "lightBulp" && <LightBulp />}</div>
    <div>{state === "randomCat" && <RandomCat />}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import LightBulp from "./components/LightBulp/index.vue";
import RandomCat from "./components/RandomCat/index.vue";
import Downloader from "./components/Downloader/index.vue";

export default defineComponent({
  name: "App",
  components: {
    LightBulp,
    RandomCat,
    Downloader,
  },
  setup() {
    const state = ref<null | "lightBulp" | "randomCat" | "downloader">(null);

    const isRandomCat = computed(() => state.value === "randomCat");
    const isLightBulp = computed(() => state.value === "lightBulp");
    const isDownloader = computed(() => state.value === "downloader");

    const clickOption = (option) => (state.value = option);

    return { state, isRandomCat, isLightBulp, isDownloader, clickOption };
  },
});
</script>

<style>
.App {
  font-family: sans-serif;
  text-align: center;
}

* {
  position: relative;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.example-buttons {
  display: flex;
  justify-content: center;
  gap: 50px;
}

[data-xstate] {
  justify-self: stretch;
  align-self: stretch;
  border: none;
}

.Downloader {
  max-width: 700px;
  margin: 0 auto;
}

.Downloader > div {
  display: flex;
  gap: 10px;
}

div.cat-pics {
  flex-wrap: wrap;
}
</style>
