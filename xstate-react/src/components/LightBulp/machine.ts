import { createMachine } from "xstate";

export const LightBulpMachine = createMachine({
  id: "lightBulp",
  initial: "off",
  states: {
    on: {
      on: {
        TOGGLE: "off",
      },
    },
    off: {
      on: {
        TOGGLE: "on",
      },
    },
  },
});
