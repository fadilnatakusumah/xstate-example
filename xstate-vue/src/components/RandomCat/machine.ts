import { createMachine, assign } from "xstate";

const API_ENDPOINT = "https://cataas.com/cat/gif";

const fetchImage = () => {
  return fetch(API_ENDPOINT, { cache: "no-cache" }).then((res) => res.blob());
};

interface FormContext {
  image: string;
}

export const RandomCatMachine = createMachine<FormContext>({
  id: "randomCat",
  context: {
    image: "",
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        FETCH: {
          target: "fetching",
        },
      },
    },
    fetching: {
      entry: assign(() => ({ image: "" })),
      invoke: {
        src: fetchImage,
        onDone: {
          actions: assign({
            image: (ctx, evt) => {
              const url: string = URL.createObjectURL(evt.data);
              return url;
            },
          }),
          target: "success",
        },
        onError: "error",
      },
    },
    success: {
      on: {
        FETCH: {
          target: "fetching",
        },
      },
    },
    error: {},
  },
});
