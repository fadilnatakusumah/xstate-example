import { useMachine } from "@xstate/react";
import { LightBulpMachine } from "./machine";

export function LightBulp() {
  const [current, send] = useMachine(LightBulpMachine);

  return (
    <div>
      <h3>Current State: {(current.value as String).toUpperCase()}</h3>
      <button onClick={() => send("TOGGLE")}>Switch</button>
      <div>
        {current.matches("on") && (
          <img src="https://img.icons8.com/material-outlined/100/000000/light-on--v2.png" />
        )}
        {current.matches("off") && (
          <img src="https://img.icons8.com/material-rounded/100/000000/light-off.png" />
        )}
      </div>
    </div>
  );
}
