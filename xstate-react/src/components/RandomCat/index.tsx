import { useMachine } from "@xstate/react";
import { RandomCatMachine } from "./machine";

export const RandomCat = () => {
  const [current, send] = useMachine(RandomCatMachine);
  const { image } = current.context;

  return (
    <div>
      <h3>Current State: {(current.value as String).toUpperCase()}</h3>
      <button onClick={() => send("FETCH")}>Get Image</button>
      <div>
        {image && (
          <img
            src={image}
            alt={"cat_gif"}
            style={{ width: "500px", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
};
