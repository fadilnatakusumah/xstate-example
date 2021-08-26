<template>
  <div class="Downloader">
    <h3>Current State: {{ current }}</h3>
    <div>
      <input
        :value="sum"
        placeholder="How much?"
        type="number"
        @change="onChange"
      />
      <button @click="onDownload">Download</button>
    </div>
    <progress v-if="isFetching" :value="{ progressValue }" :max="100" />
    <div class="cat-pics" v-if="isFinish">
      <div v-for="(item, index) in data" :key="index">
        <img :src="url" alt="url" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "@vue/reactivity";
import { useMachine } from "@xstate/vue";
import { DownloaderMachine } from "./machine";

export default {
  setup() {
    const { state, send } = useMachine(DownloaderMachine);

    const { progressValue, data, sum } = state.value.context;
    const onChange = ({ target }) =>
      send({
        type: "ENTER_SUM",
        value: +target.value,
      });
    const onDownload = () => send("DOWNLOAD");

    const isFetching = computed(() => state.value.matches("fetching"));
    const isFinish = computed(() => state.value.matches("finish"));

    return {
      current: computed(() =>
        String(JSON.stringify(state.value.value)).toUpperCase()
      ),
      progressValue,
      data,
      sum: sum || "",
      onChange,
      onDownload,
      isFetching,
      isFinish
    };
  },
};
</script>
