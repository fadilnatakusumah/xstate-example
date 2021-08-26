import { useState } from "react";
import { Downloader } from "./components/Downloader";
import { LightBulp } from "./components/LightBulp";
import { RandomCat } from "./components/RandomCat";

function App() {
  const [state, setState] = useState<
    null | "lightBulp" | "randomCat" | "downloader"
  >(null);

  return (
    <div className="App">
      <div>
        <h1>Examples {state && `: ${state}`}</h1>
        <div className="example-buttons">
          <button onClick={() => setState("lightBulp")}>Light Bulp</button>
          <button onClick={() => setState("randomCat")}>Random Cat</button>
          <button onClick={() => setState("downloader")}>Downloader</button>
        </div>
      </div>
      <div>{state === "lightBulp" && <LightBulp />}</div>
      <div>{state === "randomCat" && <RandomCat />}</div>
      <div>{state === "downloader" && <Downloader />}</div>
    </div>
  );
}

export default App;
