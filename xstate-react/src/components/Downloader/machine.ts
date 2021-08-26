import { createMachine, assign } from "xstate";

const API_ENDPOINT = "https://cataas.com/cat/gif";

const fetchImage = async (ctx: FormContext) => {
  return fetch(API_ENDPOINT, { cache: "no-cache" })
    .then((res) => res.blob())
    .then((data) => URL.createObjectURL(data));
};

export interface FormContext {
  progressValue: number;
  sum: number;
  tempValue: number;
  data: string[];
}

export const DownloaderMachine = createMachine<FormContext>(
  {
    id: "downloader",
    context: {
      progressValue: 0,
      sum: 0,
      tempValue: 0,
      data: [],
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          ENTER_SUM: {
            actions: assign({
              sum: (_ctx, evt) => evt.value,
              tempValue: (_ctx, evt) => evt.value,
            }),
          },
          DOWNLOAD: {
            cond: "isDownloadable",
            target: "fetching",
          },
        },
      },
      fetching: {
        initial: "downloading",
        entry: assign((ctx, evt) => ({
          progressValue: 0,
          data: [],
        })),
        states: {
          downloading: {
            invoke: {
              src: fetchImage,
              onDone: {
                target: "redownloading",
                actions: assign((ctx: FormContext, image) => ({
                  data: [...ctx.data, image.data],
                  progressValue: ((ctx.data.length + 1) * 100) / ctx.sum,
                  tempValue: ctx.tempValue - 1,
                })),
              },
              onError: "redownloading",
            },
          },
          redownloading: {
            after: {
              2000: [
                {
                  cond: "isNotFinished",
                  target: "downloading",
                },
                {
                  target: "#downloader.finish",
                },
              ],
            },
          },
        },
      },
      finish: {
        entry: assign((ctx, evt) => ({
          sum: 0,
          tempValue: 0,
        })),
        on: {
          ENTER_SUM: {
            actions: assign({
              sum: (_ctx, evt) => evt.value,
              tempValue: (_ctx, evt) => evt.value,
            }),
          },
          DOWNLOAD: {
            cond: "isDownloadable",
            target: "fetching",
          },
        },
      },
    },
  },
  {
    guards: {
      isDownloadable: (ctx) => ctx.sum > 0,
      isNotFinished: (ctx) => ctx.tempValue > 0,
    },
    services: {},
  }
);
