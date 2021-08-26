<template>
  <div>
    <h3>Current State: {{ current }}</h3>
    <button @click="fetching">Get Image</button>
    <div>
      <img v-if="imageCat" :src="imageCat" alt="cat_gif" />
    </div>
  </div>
</template>

<script lang="ts">
import { useMachine } from "@xstate/vue";
import { RandomCatMachine } from "./machine";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const { state, send } = useMachine(RandomCatMachine);

    const fetching = () => send("FETCH");

    const imageCat = computed(() => state.value.context.image);

    return {
      imageCat,
      current: computed(() => String(state.value.value).toUpperCase()),
      send,
      fetching,
    };
  },
};
</script>
