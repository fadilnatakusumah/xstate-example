import { useMachine } from "@xstate/react";
import { DownloaderMachine } from "./machine";

export function Downloader() {
  const [current, send] = useMachine(DownloaderMachine);
  const { progressValue, data, sum } = current.context;

  return (
    <div className="Downloader">
      {/* <h3>Current State: {JSON.stringify(current.value)}</h3> */}
      <div>
        <input
          value={sum || ""}
          placeholder="How much?"
          type="number"
          onChange={({ target }) =>
            send({
              type: "ENTER_SUM",
              value: +target.value,
            })
          }
        />
        <button onClick={() => send("DOWNLOAD")}>Download</button>
      </div>
      {current.matches("fetching") && (
        <progress value={progressValue} max={100} />
      )}
      {current.matches("finish") && (
        <div className="cat-pics">
          {data.map((url, idx) => (
            <div key={idx}>
              <img src={url} alt={url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
