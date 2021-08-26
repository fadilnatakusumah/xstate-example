<template>
  <div>
    <h3>Current State: {{ current }}</h3>
    <button @click="onToggle('TOGGLE')">Switch</button>
    <div>
      <img
        v-if="isOn"
        src="https://img.icons8.com/material-outlined/100/000000/light-on--v2.png"
      />
      <img
        v-if="isOff"
        src="https://img.icons8.com/material-rounded/100/000000/light-off.png"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "@vue/reactivity";
import { useMachine } from "@xstate/vue";
import { LightBulpMachine } from "./machine";

export default {
  setup() {
    const { state, send } = useMachine(LightBulpMachine);

    const isOn = computed(() => state.value.matches("on"));
    const isOff = computed(() => state.value.matches("off"));

    const onToggle = (value) => send(value);

    return {
      current: computed(() => String(state.value.value).toUpperCase()),
      isOn,
      isOff,
      onToggle,
    };
  },
};
</script>
